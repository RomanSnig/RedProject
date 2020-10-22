const router = require('express').Router();

const {deleteWork, create, findWork, findElasticWork, allWorksFromElastic, findWorkByStyle, findWorksByAdminId} = require('../controllers/works/worksData');

router.post('/create', create);
router.delete('/delete/:id', deleteWork);
router.get('/findWork/:id', findWork);
router.get('/findElasticWork/:id', findElasticWork);
router.get('/allWorksFromElastic', allWorksFromElastic);
router.get('/findWorkByStyle/:style', findWorkByStyle);
router.get('/findWorksByAdminId/:id', findWorksByAdminId);

module.exports = router;
