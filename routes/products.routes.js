const router = require('express').Router()
const productsController = require('../controllers/products.controllers')
const imgUpload = require('../middlewares/imgUpload')

// GET products
router.get('/products', productsController.getProducts)

// GET product by ID
router.get('/products/:id', productsController.getProductByID)

// POST product
router.post('/products', imgUpload, productsController.postProduct)

// DELETE products by ID
router.delete('/products/:id', productsController.deleteProduct)

// EDIT products by ID
router.put('/products/:id', imgUpload, productsController.editProduct)

module.exports = router;
