const CarouselItem = require('../models/carouselItem.model')
const fs = require('fs')

async function getCarouselItems(req, res) {
    try {
        const items = await CarouselItem.find()
        const total = await CarouselItem.countDocuments()
        if (!items) {
            res.status(404).send({
                ok: false,
                message: "No se han encontrado items"
            })
        }
        res.status(200).send({
            ok: true,
            message: "Items obtenidos correctamente",
            items,
            total
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al obtener los items"
        })
    }
}

async function getCarouselItemById(req, res) {
    try {
        const id = req.params.id
        const item = await CarouselItem.findById(id)
        if (!item) {
            res.status(404).send({
                ok: false,
                message: "No se ha encontrado el item"
            })
        }
        res.status(200).send({
            ok: true,
            message: "Item obtenido correctamente",
            item
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al obtener el item"
        })
    }
}
async function postCarouselItem(req, res) {
    try {
        const carouselItem = new CarouselItem(req.body)
        if (req.files) {
            if (req.files.carouselImage) {
                req.files.carouselImage.forEach(image => {
                    carouselItem.carouselImage = { name: image.originalname, id: image.filename }
                })
            }
        }
        const newItem = await carouselItem.save()
        if (!newItem) {
            return res.status(500).send({
                ok: false,
                message: "Error al crear el item"
            })
        }
        res.status(200).send({
            ok: true,
            message: "Item creado correctamente",
            newItem
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al crear el item"
        })
    }
}

async function editCarouselItem(req, res) {
    try {
        const id = req.params.id
        const updtItem = req.body
        const oldItem = await CarouselItem.findById(id)
        updtItem.updatedAt = Date.now()
        if (req.files) {
            if (req.files.carouselImage) {
                req.files.carouselImage.forEach(image => {
                    updtItem.carouselImage = { name: image.originalname, id: image.filename }
                })
                if (updtItem.carouselImage.id) {
                    fs.unlinkSync(`./public/images/carouselItems/${oldItem.carouselImage.id}`)
                }
            } else {
                delete updtItem.carouselImage
            }
        }
        const updatedItem = await CarouselItem.findByIdAndUpdate(id, updtItem, { new: true })
        if (!updatedItem) {
            return res.status(404).send({
                ok: false,
                message: "No se ha encontrado el item a editar"
            })
        }
        res.status(200).send({
            ok: true,
            message: "Item editado correctamete",
            updatedItem
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al editar el item"
        })
    }
}

async function deleteItem(req, res) {
    try {
        const id = req.params.id
        const dltItem = await CarouselItem.findById(id)
        fs.unlinkSync(`./public/images/carouselItems/${dltItem.carouselImage.id}`)
        const deletedItem = await CarouselItem.findByIdAndDelete(id)
        if (!deletedItem) {
            return res.status(404).send({
                ok: false,
                message: "No se ha encontrado el item a eliminar"
            })
        }
        res.status(200).send({
            ok: true,
            message: "Item eliminado correctamente"
        })
    } catch (error) {
        console.log(error)
        res.status(404).send({
            ok: false,
            message: "Error al eliminar el item"
        })
    }
}

module.exports = {
    getCarouselItems, getCarouselItemById, postCarouselItem, editCarouselItem, deleteItem
}