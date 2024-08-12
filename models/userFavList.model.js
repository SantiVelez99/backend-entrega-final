const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userFavListSchema = new Schema({

    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true},
    favList: { type: [Schema.Types.ObjectId], ref: "Product", required: true, maxLength: 30 }

})

module.exports = mongoose.model("FavList", userFavListSchema)