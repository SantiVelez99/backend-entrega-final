const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const storage = multer.diskStorage({
    destination: 'public/images/products',
    filename: (req, file, cb) => {
        crypto.randomBytes(16, (error, buffer) => { 
            if(error) return cb(error)
                const filename = buffer.toString('hex') + path.extname(file.originalname)
            cb(null, filename)
        })
    }
})

const imgUpload = multer({ storage: storage }).fields([
    {name:'productImage', maxCount: 1},
    {name:'productDescPictures', maxCount: 6}
])
module.exports = imgUpload