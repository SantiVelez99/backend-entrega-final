const router = require('express').Router()
const tagController = require('../controllers/tags.controllers')
const imgUpload = require('../middlewares/imgUpload')

router.get('/tags', tagController.getTags)

router.get('/tags/:id', tagController.getTagById)

router.post('/tags', imgUpload, tagController.postTag)

router.put('/tags/:id', tagController.editTag)

router.delete('/tags/:id', tagController.deleteTag)

module.exports = router