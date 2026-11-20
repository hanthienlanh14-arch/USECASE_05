const router = require('express').Router();
const gd = require('../controllers/giaiDauController');
const td = require('../controllers/tranDauController');

router.get('/', gd.list);                       // GET  /api/giaidau
router.post('/', gd.create);                    // POST /api/giaidau
router.get('/:id/doituyen', gd.doiDaDangKy);    // GET  /api/giaidau/:id/doituyen
router.get('/:id/trandau', td.list);            // GET  /api/giaidau/:id/trandau?ngay=YYYY-MM-DD

module.exports = router;
