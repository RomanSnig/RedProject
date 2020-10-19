const router = require('express').Router();

const {auth, recoverPassword, logout, changePassword} = require('../controllers/person/personData');

router.post('/login', auth);
router.post('/recoverPassword', recoverPassword);
router.put('/changePassword', changePassword);
router.post('/logout', logout);

module.exports = router;
