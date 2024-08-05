const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true, match: [ /.+@.+\..+/ ] },
    products: [
        {
            product: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
            price: { type: Number, required: true, min: 0, max: 999999 },
            quantity: { type: Number, required: true, min: 1, max: 999, default: 1 }
        }
    ],
    total: { type: Number, required: true },
    status: { type: String, defualt: "open", enum: [ "open", "closed", "cancelled" ] },
    createdAt: { type: Number, default: Date.now },
    closedAt: { type: Number, default: Date.now }
})

module.exports = mongoose.model('Order', orderSchema)