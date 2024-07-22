const router = require("express").Router()

const productsRoutes = require('./products.routes')
const usersRoutes = require('./users.routes')
const tagsRoutes = require('./tags.routes')

router.use([productsRoutes, tagsRoutes, usersRoutes])
module.exports = router