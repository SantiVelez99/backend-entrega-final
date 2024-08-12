const router = require('express').Router()
const favListController = require('../controllers/userFavList.controller')
const auth = require('../middlewares/auth')
const imgUpload = require('../middlewares/imgUpload')
const isAdmin = require('../middlewares/isAdmin')

router.get('/favList', [auth, isAdmin], favListController.getFavLists)

router.get('/favList/:id', favListController.getFavListByUserId)

router.post('/favList', [auth, imgUpload], favListController.postFavList)

router.put('/favList/:id', [auth, imgUpload], favListController.updateFavList)

module.exports = router