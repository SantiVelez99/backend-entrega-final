const router = require("express").Router()

const productsRoutes = require('./products.routes')
const usersRoutes = require('./users.routes')
const tagsRoutes = require('./tags.routes')
const orderRoutes = require('./order.routes')
const carouselRoutes = require('./carouselItem.routes')
const contactRoutes = require('./contact.routes')
const favListRoutes = require('./favList.routes')

router.use([productsRoutes, tagsRoutes, usersRoutes, orderRoutes, carouselRoutes, contactRoutes, favListRoutes])
module.exports = router