const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagSchema = new Schema({
    name: { type: String, required: true, unique: true, index: true, trim: true, minLength: 2, maxLength: 80 },
    viewValue: { type: String, required: true, unique: true, trim: true, minLength: 2, maxLength: 80 }
})

module.exports = mongoose.model("Tag", tagSchema)