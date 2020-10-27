const router = require('express').Router();

const {createAdmin, changeStatus, deleteAdmin, changeData, findAdminsByStatus, getAdminById, findAll} = require('../controllers/admin/adminData');

router.post('/create', createAdmin);
router.delete('/delete/:id', deleteAdmin);
router.put('/changeStatus', changeStatus);
router.put('/changeData/:id', changeData);
router.get('/findAdminsByStatus/:status', findAdminsByStatus);
router.get('/getById/:id', getAdminById);
// router.get('/findAll', findAll);

module.exports = router;
