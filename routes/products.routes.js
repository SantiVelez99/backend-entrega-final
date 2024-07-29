const router = require('express').Router()
const productsController = require('../controllers/products.controllers')
const imgUpload = require('../middlewares/imgUpload')
const auth = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')

// GET products
router.get('/products', productsController.getProducts)

// GET product by ID
router.get('/products/:id', productsController.getProductByID)

// POST product
router.post('/products', [auth, isAdmin, imgUpload] , productsController.postProduct)

// DELETE products by ID
router.delete('/products/:id', [auth, isAdmin] , productsController.deleteProduct)

// EDIT products by ID
router.put('/products/:id', [auth, isAdmin, imgUpload], productsController.editProduct)

module.exports = router;
