const router = require('express').Router();

const {auth, recoverPassword, logout, changePassword} = require('../controllers/person/personData');
const {refreshToken} = require('../controllers/person/refreshToken');

router.post('/login', auth);
router.post('/recoverPassword', recoverPassword);
router.put('/changePassword', changePassword);
router.post('/logout', logout);
router.put('/refreshToken/:id', refreshToken);

module.exports = router;
