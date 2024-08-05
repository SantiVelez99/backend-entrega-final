const Product = require('../models/products.model')
const fs = require('fs')

async function getProducts(req, res) {
    try {
        console.log(req.query.name)
        const page = req.query.page || 0;
        const limit = req.query.limit || 100;
        const filter = []
        if (req.query.name) filter.push({ productName: { $regex: req.query.name, $options: 'i' } })
        if (req.query.tag) filter.push({ productTags: req.query.tag })
        if (filter.length === 0) filter.push({})
        const products = await Product.find({
            $and: filter
        })
            .populate("productTags", "name viewValue")
            .skip(page * limit)
            .limit(limit)
            const total = await Product.countDocuments({$and:filter})
        if (products) {
            res.status(200).send({
                ok: true,
                message: "Get exitoso",
                products,
                total
            })
        }
    } catch (error) {
        console.log(error)
        res.send({
            ok: false,
            message: "Error al obtener los productos",
            error: error
        })
    }
}

async function getProductByID(req, res) {
    try {
        const id = req.params.id
        const product = await Product.findById(id).populate("productTags", "name viewValue")
        if (!product) {
            return res.statuss(404).send({
                ok: false,
                message: "No se ha encontrado el producto",
            })
        }
        res.status(200).send({
            ok: true,
            message: "Producto obtenido correctamente",
            product: product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al buscar el producto",
            error: error
        })
    }
}

async function postProduct(req, res) {
    try {
        const product = new Product(req.body)
        product.productMinReq = JSON.parse(req.body.productMinReq)
        product.productMaxReq = JSON.parse(req.body.productMaxReq)
        console.log(product)
        console.log(req.files)
        if (req.files) {
            if (req.files.productImage) {
                req.files.productImage.forEach(image => {
                    product.productImage = { name: image.originalname, id: image.filename }
                })
            }
            if (req.files.productDescPictures) {
                req.files.productDescPictures.forEach(image => {
                    product.productDescPictures.push({ name: image.originalname, id: image.filename })
                })
            }
            if (req.files.productPortrait) {
                req.files.productPortrait.forEach(image => product.productPortrait = { name: image.originalname, id: image.filename })
            }
        }
        const newProduct = await product.save();
        if (!newProduct) {
            return res.status(500).send({
                ok: false,
                message: "Error al crear el producto"
            })
        }
        res.status(201).send({
            ok: true,
            message: "Producto creado correctamente",
            producto: newProduct
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al crear el producto",
            error
        })
    }
}

async function editProduct(req, res) {
    try {
        const id = req.params.id
        const updtProduct = req.body
        updtProduct.productMinReq = JSON.parse(req.body.productMinReq)
        updtProduct.productMaxReq = JSON.parse(req.body.productMaxReq)
        const oldProduct = await Product.findById(id)
        updtProduct.updatedAt = Date.now()
        if (req.files) {
            if (req.files.productImage) {
                req.files.productImage.forEach(image => {
                    updtProduct.productImage = { name: image.originalname, id: image.filename }
                })
                if (updtProduct.productImage.id) {
                    fs.unlinkSync(`./public/images/products/card-images/${oldProduct.productImage.id}`)
                }
            } else {
                delete updtProduct.productImage
            }
            if (req.files.productDescPictures) {
                updtProduct.productDescPictures = []
                req.files.productDescPictures.forEach(image => {
                    updtProduct.productDescPictures.push({ name: image.originalname, id: image.filename })
                })
                for (let i = 0; i < updtProduct.productDescPictures.length; i++) {
                    fs.unlinkSync(`./public/images/products/extra-images/${oldProduct.productDescPictures[i].id}`)
                }
            } else {
                delete updtProduct.productDescPictures
            }
            if (req.files.productPortrait) {
                req.files.productPortrait.forEach(image => {
                    updtProduct.productPortrait = { name: image.originalname, id: image.filename }
                })
                if (updtProduct.productPortrait.id) {
                    fs.unlinkSync(`./public/images/products/portrait-images/${oldProduct.productPortrait.id}`)
                }
            } else {
                delete updtProduct.productPortrait
            }
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, updtProduct, { new: true })
        if (!updatedProduct) {
            return res.status(404).send({
                ok: false,
                message: "No se ha encontrado el producto"
            })
        }
        res.status(200).send({
            ok: true,
            message: "Producto editado correctamente",
            update: updatedProduct
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al editar el producto",
            error: error
        })
    }
}

async function deleteProduct(req, res) {
    try {
        const id = req.params.id
        const deletedProduct = await Product.findById(id)
        fs.unlinkSync(`./public/images/products/card-images/${deletedProduct.productImage.id}`)
        fs.unlinkSync(`./public/images/products/portrait-images/${deletedProduct.productPortrait.id}`)
        deletedProduct.productDescPictures.forEach(image => {
            fs.unlinkSync(`./public/images/products/extra-images/${image.id}`)
        })

        const deleteProduct = await Product.findByIdAndDelete(id)
        if (!deletedProduct) {
            return res.status(404).send({
                ok: false,
                message: "No se ha encontrado el producto"
            })
        }
        res.status(200).send({
            ok: true,
            message: "Producto eliminado correctamente",
            deleted: deleteProduct
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al borrar el producto",
            error: error
        })
    }
}
module.exports = {
    getProducts, postProduct, getProductByID, editProduct, deleteProduct
}