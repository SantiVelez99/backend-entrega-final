const mongoose = require('mongoose')
const Schema = mongoose.Schema

const carouselSchema = new Schema({
    title: { type: String, required: true, minLength: 3, maxLength: 60, trim: true },
    description: { type: String, required: true, minLength: 3, maxLength: 300, trim: true },
    carouselImage: { type: Object, trim: true },
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: Date.now },
    active: { type: Boolean, default: true },
    product: { type: Schema.Types.ObjectId, unique: true, ref: 'Product' }
})

module.exports = mongoose.model('Carousel', carouselSchema)