const router = require('express').Router();

const {auth, recoverPassword, logout} = require('../controllers/auth/auth');
const {refreshToken} = require('../controllers/auth/refreshToken');

router.post('/login', auth);
router.post('/refreshToken', refreshToken);
router.post('/changePassword', recoverPassword);
router.get('/logout', logout);

module.exports = router;
