const router = require('express').Router();

const {deleteWork, create, findWork} = require('../controllers/works/worksData');

router.post('/create', create);
router.delete('/delete', deleteWork);
router.get('/findWork/:id', findWork);

module.exports = router;
