const tokenVerificator= require('../../helpers/tokenVerificator');
const tokenazer= require('../../helpers/tokenazer');
const Person = require('../../dataBase/models/personSchema');
module.exports.refreshToken = async (req, res) =>{
    try {
        const token = req.get('Authorization');
        const user = tokenVerificator(token, 'refresh');
        delete user.exp, user.iat;
        const tokens = tokenazer(user);
        await Person.findByIdAndUpdate({_id: req.params.id}, {token: tokens})
        res.json({
            success: true,
            message: tokens
        })
    } catch (e) {
        console.log(e);
        res.status(400).json({
            access: false,
            msg:e.message
        })
    }
};
