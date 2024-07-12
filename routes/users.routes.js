const userController = require('../controllers/user.controller')
const router = require('express').Router()
const imgUpload = require('../middlewares/imgUpload')

router.get('/users', userController.getUsers)

router.get('/users/:id', userController.getUserById)

router.post('/users', imgUpload, userController.postUser)

router.put('/users/:id', imgUpload, userController.editUser)

router.delete('/users/:id', userController.deleteUser)

module.exports = router