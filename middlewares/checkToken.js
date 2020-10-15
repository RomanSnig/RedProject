const tokenVerificator = require('../helpers/tokenVerificator');

module.exports = (req, res, next) => {
    try {
        const authToken = req.get('Authorization')
        const confirmToken = req.query.t;
        let user = {};
        if (!authToken && !confirmToken) {
            throw new Error('NO TOKEN!!! CHECK TOKEN');
        }
        if(authToken) user = tokenVerificator(authToken, 'auth');
        if (confirmToken) user = tokenVerificator(confirmToken, 'confirm');
        // if (!user) throw new Error('NO TOKEN!!! CHECK TOKEN');
        req.user = user;
        next()
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
