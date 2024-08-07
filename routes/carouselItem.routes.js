const router = require('express').Router()
const carouselItemController = require('../controllers/carouselItem.controller')
const imgUpload = require('../middlewares/imgUpload')
const auth = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')

router.get('/carouselItems', carouselItemController.getCarouselItems)

router.get('/carouselItems/:id', carouselItemController.getCarouselItemById)

router.post('/carouselItems', [auth, isAdmin, imgUpload] , carouselItemController.postCarouselItem)

router.delete('/carouselItems/:id', [auth, isAdmin], carouselItemController.deleteItem)

router.put('/carouselItems/:id', [ auth, isAdmin, imgUpload ], carouselItemController.editCarouselItem)

module.exports = router;