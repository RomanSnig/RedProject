const tokenVerificator= require('../../helpers/tokenVerificator');
const tokinazer= require('../../helpers/tokinazer');
module.exports.refreshToken = (req, res) =>{
    try {
        const token = req.get('Authorization');
        const user = tokenVerificator(token, 'refresh');
        delete user.exp;
        delete user.iat;
        const tokens = tokinazer(user);
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
