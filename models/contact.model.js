const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactSchema = new Schema({

    fullName: { type: String, required: true, minLength: 3, maxLength: 60,match: [/^[a-zA-Z\s]+$/] },
    email: { type: String, required: true, match: [ /.+@.+\..+/ ], minLength: 3, maxLength: 80 },
    contactDate: { type: Number, default: Date.now },
    message: { type: String, minLength: 10, maxLength: 1000, required: true },
    contactImages: { type: Array, trim: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }
})

module.exports = mongoose.model("Contact", contactSchema)