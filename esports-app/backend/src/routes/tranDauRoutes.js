const router = require('express').Router();
const td = require('../controllers/tranDauController');

router.post('/', td.create);                    // POST /api/trandau
router.put('/:maTran/tiso', td.updateTiSo);     // PUT  /api/trandau/:maTran/tiso

module.exports = router;
