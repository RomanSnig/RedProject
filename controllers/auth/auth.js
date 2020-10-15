const tokenizer = require('../../helpers/tokenazer');
const {checkHashPassword} = require('../../helpers/passwordHasher');
const {recoverPassword} = require('../../service/recoverPasswordByEmail');
const {hashPassword} = require('../../helpers/passwordHasher');
const crypto = require('crypto');

module.exports.auth = async (req, res) => {
    const {email,password} = req.body;
    try {
        if (!email || !password) throw new Error('Some field is empty');
        const isPresent = await DB.findOne({
            email: email
        });
        if (!isPresent) throw new Error('You are not register!!!')
        const {_id, name, password: hashPassword} = isPresent[0];
        const isPassOK = await checkHashPassword(password, hashPassword);
        if (!isPassOK) throw new Error('Password is wrong');
        const token = tokenizer({_id, name});
        await DB.findByIdAndUpdate({_id: isPresent[0]._id}, {token: token});
        delete isPresent[0].password;
        res.json({
            access: true,
            message: token,
            user: isPresent
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
};

module.exports.logout = async (req, res) => {
    try {
        await DB.findByIdAndUpdate({_id: req.params._id}, {token: ''});
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
};

module.exports.recoverPassword = async (req, res) => {
    let {email} = req.body;
    try {
        if (!email) throw new Error('Some field is empty');
        const isPresent = await DB.findOne({
            email: email
        });
        if (!isPresent) throw new Error('NO USER WITH EMAIL:' + email);
        let newPassword = crypto.randomBytes(20).toString('hex');
        const hashedPassword = await hashPassword(newPassword);
        await DB.findByIdAndUpdate({_id: isPresent[0]._id}, {password: hashedPassword});
        await recoverPassword(email, hashedPassword);
        res.json('New password has just been sent to your email');
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
