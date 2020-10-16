const router = require('express').Router();

const {auth, recoverPassword, logout, changePassword} = require('../controllers/person/personData');

router.post('/login', auth);
router.post('/recoverPassword', recoverPassword);
router.post('/changePassword', changePassword);
router.get('/logout/:id', logout);

module.exports = router;
