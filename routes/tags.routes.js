const router = require('express').Router()
const tagController = require('../controllers/tags.controllers')
const auth = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')

router.get('/tags', tagController.getTags)

router.get('/tags/:id', tagController.getTagById)

router.post('/tags', [auth, isAdmin ] , tagController.postTag)

router.put('/tags/:id', [auth, isAdmin] , tagController.editTag)

router.delete('/tags/:id', [auth, isAdmin] , tagController.deleteTag)

module.exports = router