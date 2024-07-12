const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const saltRounds = 10
const fs = require('fs')

async function getUsers(req, res) {
    try {
        const users = await User.find().select({ userPassword: 0 })
        if (!users) {
            res.status(404).send({
                ok: false,
                message: "No se han encontrado usuarios"
            })
        }
        res.status(200).send({
            ok: true,
            message: "Usuarios obtenidos correctamente",
            users: users
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al obtener los usuarios",
            error: error
        })
    }
}

async function getUserById(req, res) {
    try {
        const id = req.params.id
        const user = await User.findById(id).select({ userPassword: 0 })
        if (!user) {
            res.status(404).send({
                ok: false,
                message: "No se ha encontrado el usuario"
            })
        }
        res.status(200).send({
            ok: true,
            message: "Usuario encontrado correctamente",
            user: user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al obtener el usuario",
            error: error
        })
    }
}

async function postUser(req, res) {
    try {
        const user = new User(req.body)
        user.userPassword = await bcrypt.hash(user.userPassword, saltRounds)
        if (req.files) {
            if (req.files.userAvatar) {
                req.files.userAvatar.forEach(avatar => {
                    user.userAvatar = { name: avatar.originalname, id: avatar.filename }
                })
            }
        }
        const newUser = await user.save()
        if (!newUser) {
            return res.status(500).send({
                ok: false,
                message: "Error al crear el usuario"
            })
        }
        res.status(201).send({
            ok: true,
            message: "Usuario creado exitosamente",
            user: newUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al crear el usuario"
        })
    }
}

async function editUser(req, res) {
    try {
        const id = req.params.id
        const oldUser = await User.findById(id)
        const uptUser = req.body
        uptUser.userPassword = undefined
        if (req.files.userAvatar) {
            fs.unlinkSync(`./public/images/users/user-avatar/${oldUser.userAvatar.id}`)
            uptUser.userAvatar = {}
            req.files.userAvatar.forEach(image => {
                uptUser.userAvatar = { name: image.originalname, id: image.filename }
            })
        }
        const updatedUser = await User.findByIdAndUpdate(id, uptUser, { new: true })
        if (!updatedUser) {
            return res.status(404).send({
                ok: false,
                message: "No se ha encontrado el usuario"
            })
        }
        res.status(200).send({
            ok: true,
            message: "Usuario editado exitosamente",
            user: updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al editar el usuario",
            error: error
        })
    }
}

async function deleteUser(req, res) {
    const id = req.params.id
    const user = await User.findById(id)
    if (!user) {
        return res.status(404).send({
            ok: false,
            message: "No se ha encontrado al usuario"
        })
    }
    if (user.userAvatar.id !== "user-profile-default.png") {
        fs.unlinkSync(`./public/images/users/user-avatar/${user.userAvatar.id}`)
    }
    const deletedUser = await User.findByIdAndDelete(id)
    res.status(200).send({
        ok: true,
        message: "Usuario eliminado correctamente",
        user: deletedUser
    })
}
module.exports = { getUsers, getUserById, postUser, editUser, deleteUser }