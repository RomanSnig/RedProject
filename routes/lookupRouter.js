const router = require('express').Router();

const {create, keyToSubject} = require('../controllers/lookup/lookupData');

router.post('/create', create);
router.get('/keyToSubject/:key', keyToSubject);

module.exports = router;
