const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: { type: String, required: true, minLength: 3, maxLength: 100, index: true, trim: true },
    productPrice: { type: Number, required: true, min: 0, max: 999999 },
    productDesc: { type: String, required: true, minLength: 3, maxLength: 2000 },
    productImage: { type: String, trim: true },
    productPortrait: { type: String, trim: true },
    productDate: { type: Number, default: Date.now },
    productDeveloper: { type: String, minLength: 3, maxLength: 100 },
    productVideo: { type: String, minLength: 3, maxLength: 500 },
    productDescPictures: { type: Array },
    productTags: { type: Array },
    productMinReq: { type: Object },
    productMaxReq: { type: Object }
})

module.exports = mongoose.model("Product", productSchema)