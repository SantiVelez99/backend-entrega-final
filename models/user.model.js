const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    userName: { type: String, required: true, minLength: 3, maxLength: 60, match: [/^[a-zA-Z\s]+$/, 'El nombre de usuario solo puede contener caracteres alfabéticos'] 
    },
    userEmail: { type: String, required: true, unique: true, match: [ /.+@.+\..+/, "Caracteres invalidos" ], minLength: 3, maxLength: 60 },
    userBorndate: { type: Number },
    userCountry: { type: String },
    userAvatar: { type: Object, default: {id: "user-profile-default.png", name: "user-avatar-default"}, trim: true},
    userPassword: { type: String, 
                    required: true,
                    // match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/, 'La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número'],
    },
    userRole: { type: String, default: "CLIENT_ROLE" }
})

module.exports = mongoose.model("User", userSchema)