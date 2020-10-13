const router = require('express').Router();

const {createAdmin, changeStatus, deleteAdmin, changeAdminData, findAdmins} = require('../controllers/admin/adminData');

router.post('/create', createAdmin);
router.get('/delete/:id', deleteAdmin);
router.put('/changeStatus', changeStatus);
router.put('/changeData', changeAdminData);
router.get('/find/:status', findAdmins);

module.exports = router;
