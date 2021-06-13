const express = require('express');

//controllers
const categoryController = require('../controllers/categoryController');

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

const router = express.Router();

router.post('/category', authCheck, adminCheck, categoryController.create);
router.get('/categories', categoryController.list);
router.get('/category/:slug', authCheck, adminCheck, categoryController.read);
router.put('/category/:slug', authCheck, adminCheck, categoryController.update);
router.delete('/category/:slug', authCheck, adminCheck, categoryController.remove);
router.get('/category/subs/:_id', categoryController.getSubs);

module.exports = router;