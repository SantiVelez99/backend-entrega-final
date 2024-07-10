const router = require('express').Router()
const productsController = require('../controllers/products.controllers')
const imgUpload = require('../middlewares/imgUpload')

// GET products
router.get('/products', productsController.getProducts)

// GET product by ID
router.get('/products/:id')

// POST product
router.post('/products', imgUpload, productsController.postProduct)

// DELETE products by ID
router.delete('/products/:id')

// EDIT products by ID
router.put('/products/:id')

module.exports = router;
