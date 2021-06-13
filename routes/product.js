const express = require('express');

//controllers
const productController = require('../controllers/productController');

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

const router = express.Router();

router.post('/product', authCheck, adminCheck, productController.create);

router.get('/products/total', productController.productsCount)

router.get('/products/:count', productController.listAll);

router.delete('/product/:slug', authCheck, adminCheck, productController.remove)
router.get('/product/:slug', productController.read)

router.put('/product/:slug', authCheck, adminCheck, productController.update)

router.post('/products', productController.list)

router.put('/product/star/:productId', authCheck, productController.productStar)

router.get('/product/related/:productId', productController.listRelated);

//SEARCH

router.post('/search/filters', productController.filters)

module.exports = router;