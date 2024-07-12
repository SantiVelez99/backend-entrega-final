const router = require("express").Router()

const productsRoutes = require('./products.routes')
const usersRoutes = require('./users.routes')

router.use([productsRoutes, usersRoutes])
module.exports = router