const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder;
        if(file.fieldname === "productImage") folder = 'public/images/products/card-images'
        if(file.fieldname === "productDescPictures") folder = 'public/images/products/extra-images'
        if(file.fieldname === "productPortrait") folder = 'public/images/products/portrait-images'
        if(file.fieldname === "userAvatar") folder = 'public/images/users/user-avatar'
        if(file.fieldname === "carouselImage") folder = 'public/images/carouselItems'
        cb(null, folder)
    },
    filename: (req, file, cb) => {
        crypto.randomBytes(16, (error, buffer) => { 
            if(error) return cb(error)
                const filename = buffer.toString('hex') + path.extname(file.originalname)
            cb(null, filename)
        })
    }
})

const imgUpload = multer({ storage: storage }).fields([
    {name:'productDescPictures', maxCount: 10},
    {name:'productImage', maxCount: 1},
    {name:'productPortrait', maxCount: 1},
    {name:'userAvatar', maxCount: 1},
    {name: 'carouselImage', maxCount: 1}
])
module.exports = imgUpload