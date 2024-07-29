const router = require('express').Router()
const orderController = require('../controllers/order.controllers')
const auth = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')

router.get('/orders/:idUser?', auth , orderController.getOrders)

router.get('/orders/byID/:id', [auth, isAdmin] , orderController.getOrderById)

router.post('/orders', auth, orderController.postOrder)

router.delete('/orders/:id', [ auth, isAdmin ], orderController.deleteOrder)

module.exports = router