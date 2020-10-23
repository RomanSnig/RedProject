const router = require('express').Router();

const {create, keyToSubject, findByType, findAll} = require('../controllers/lookup/lookupData');

router.post('/create', create);
router.get('/keyToSubject/:key', keyToSubject);
router.get('/findAll', findAll);
router.get('/findByType/:type', findByType);
module.exports = router;
