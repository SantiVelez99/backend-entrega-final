const router = require('express').Router()
const contactController = require('../controllers/contact.controller')
const imgUpload = require('../middlewares/imgUpload')
const auth = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')

router.get('/contact/:idUser?', auth , contactController.getContacts)

router.get('/contact/ticket/:id', [auth, isAdmin] , contactController.getContactById)

router.post('/contact', imgUpload, contactController.postContact)

router.delete('/contact/:id', [auth, isAdmin], contactController.deleteContact)

module.exports = router;