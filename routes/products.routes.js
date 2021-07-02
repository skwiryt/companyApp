const express = require('express');
const ProductsController = require('../controllers/products.controller');

const router = express.Router();


router.get('/products', ProductsController.getAll);

router.get('/products/random', ProductsController.getRandom);

router.get('/products/:id', ProductsController.getOne);

router.post('/products', ProductsController.addOne);

router.put('/products/:id', ProductsController.edit);

router.delete('/products/:id', ProductsController.delete);

module.exports = router;
