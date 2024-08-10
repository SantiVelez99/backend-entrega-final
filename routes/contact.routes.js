const router = require('express').Router()
const contactController = require('../controllers/contact.controller')
const imgUpload = require('../middlewares/imgUpload')

router.get('/contact', contactController.getContacts)

router.get('/contact/:id', contactController.getContactById)

router.post('/contact', imgUpload, contactController.postContact)

module.exports = router;