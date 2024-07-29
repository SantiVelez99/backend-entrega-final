const userController = require('../controllers/user.controller')
const router = require('express').Router()
const imgUpload = require('../middlewares/imgUpload')

const auth = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')

router.get('/users', userController.getUsers)

router.get('/users/:id', userController.getUserById)

router.post('/users', imgUpload, userController.postUser)

router.post('/login', userController.logIn)

router.put('/users/:id', [auth, isAdmin] , imgUpload, userController.editUser)

router.delete('/users/:id', [auth, isAdmin] , userController.deleteUser)

module.exports = router