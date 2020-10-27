const tokenizer = require('../../helpers/tokenazer');
const {checkHashPassword} = require('../../helpers/passwordHasher');
const {recoverPassword} = require('../../service/recoverPasswordByEmail');
const {hashPassword} = require('../../helpers/passwordHasher');
const crypto = require('crypto');
const personSchema = require('../../dataBase/models/personSchema');

module.exports.auth = async (req, res) => {
    try {
        let {email, password} = req.body;
        if (!email || !password) throw new Error('Some field is empty');
        let isPresent = await personSchema.findOne({
            email: email
        });
        if (!isPresent) throw new Error('You are not register!!!');
        if (isPresent.token) throw new Error('Token Is Present');
        let {_id, password: hashPassword} = isPresent;
        const isPassOK = await checkHashPassword(password, hashPassword);
        if (!isPassOK) throw new Error('Password is wrong');
        const token = tokenizer({_id, email});
        await personSchema.findByIdAndUpdate({_id: _id}, {token: token});
        delete isPresent._doc.password
        // console.log(isPresent._doc)
        // delete isPresent.password;
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
        // let isTokenPresent = await personSchema.findById({_id: req.body._id});
        // if(!isTokenPresent.token) throw new Error('NO TOKEN!!');
        await personSchema.findByIdAndUpdate({_id: req.body._id}, {token: null});
        res.json({success: true})
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
        let isPresent = await personSchema.findOne({
            email: email
        });
        if (!isPresent) throw new Error('NO USER WITH EMAIL:' + email);
        let newPassword = crypto.randomBytes(20).toString('hex');
        const hashedPassword = await hashPassword(newPassword);
        await personSchema.findByIdAndUpdate({_id: isPresent._id}, {password: hashedPassword});
        await recoverPassword(email, newPassword);
        res.json('New password has just been sent to your email');
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

module.exports.changePassword = async (req, res) => {
    try {
        console.log(req.body);
        let {password, _id, newPassword} = req.body;
        if(!password || !newPassword || !_id) throw new Error('Some field is Empty!');
        let isPresent = await personSchema.findById({_id});
        if(!isPresent) throw new Error('Admin is not Present');
        const {password: oldHashPassword} = isPresent;
        const isPassOK = await checkHashPassword(password, oldHashPassword);
        if (!isPassOK) throw new Error('Password is wrong');
        const hashedPassword = await hashPassword(newPassword);
        await personSchema.findByIdAndUpdate({_id:_id}, {password:hashedPassword});
        res.json({
            success: true
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
