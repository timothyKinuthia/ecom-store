const express = require('express');

//controllers
const subController = require('../controllers/subController');

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

const router = express.Router();

router.post('/sub', authCheck, adminCheck, subController.create);
router.get('/subs', subController.list);
router.get('/sub/:slug', authCheck, adminCheck, subController.read);
router.put('/sub/:slug', authCheck, adminCheck, subController.update);
router.delete('/sub/:slug', authCheck, adminCheck, subController.remove);

module.exports = router;