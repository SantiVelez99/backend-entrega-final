const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productMinReq = new Schema({
    productSoMin: { type: String, required: true, minLenth: 3, maxLength: 100 },
    productCPUMin: { type: String, required: true, minLenth: 3, maxLength: 100 },
    productRAMMin: { type: String, required: true, minLenth: 3, maxLength: 100 },
    productGPUMin: { type: String, required: true, minLenth: 3, maxLength: 100 },
    productSpaceMin: { type: String, required: true, minLenth: 3, maxLength: 100 }
})
const productMaxReq = new Schema({
    productSoRec: { type: String, required: true, minLenth: 3, maxLength: 100 },
    productCPURec: { type: String, required: true, minLenth: 3, maxLength: 100 },
    productRAMRec: { type: String, required: true, minLenth: 3, maxLength: 100 },
    productGPURec: { type: String, required: true, minLenth: 3, maxLength: 100 },
    productSpaceRec: { type: String, required: true, minLenth: 3, maxLength: 100 }
})
const productSchema = new Schema({
    productName: { type: String, required: true, minLength: 3, maxLength: 100, index: true, trim: true },
    productPrice: { type: Number, required: true, min: 0, max: 999999 },
    productDesc: { type: String, required: true, minLength: 3, maxLength: 2000 },
    productImage: { type: Object, trim: true },
    productPortrait: { type: Object, trim: true },
    productDate: { type: Number, default: Date.now },
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: Date.now },
    productDeveloper: { type: String, minLength: 3, maxLength: 100 },
    productVideo: { type: String, minLength: 3, maxLength: 500 },
    productDescPictures: { type: Array, trim: true },
    productTags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    productMinReq: {type: Object, object: productMinReq},
    productMaxReq: {type: Object, object: productMaxReq},
    timesSold: { type: Number, default: 0 }
})

module.exports = mongoose.model("Product", productSchema)