const router = require("express").Router()

const productsRoutes = require('./products.routes')
const usersRoutes = require('./users.routes')
const tagsRoutes = require('./tags.routes')
const orderRoutes = require('./order.routes')

router.use([productsRoutes, tagsRoutes, usersRoutes, orderRoutes])
module.exports = router