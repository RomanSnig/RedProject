const router = require('express').Router();

const {createAdmin, changeStatus, deleteAdmin} = require('../controllers/admin/adminData');

router.post('/create', createAdmin);
router.get('/delete/:id', deleteAdmin);
router.put('/changeStatus', changeStatus);

module.exports = router;