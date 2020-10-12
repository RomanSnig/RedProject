const router = require('express').Router();

const createAdmin = require('../controllers/admin/createAdmin');
const deleteAdmin = require('../controllers/admin/deleteAdmin');
const changeAdminStatus = require('../controllers/admin/changeAdminStatus');

router.post('/create', createAdmin.create);
router.get('/delete/:id', deleteAdmin.delete);
router.put('/changeStatus', changeAdminStatus.changeStatus);

module.exports = router;