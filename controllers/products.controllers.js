const Product = require('../models/products.model')


async function getProducts(req, res){
    try {
        res.send({
            ok: true,
            message: "Get exitoso"
        })
    } catch (error) {
        console.log(error)
        res.send({
            ok: false,
            message: "Error en el get"
        })
    }
}

async function postProduct(req, res){
    try {
        const product = new Product(req.body)
        if(req.file?.filename){
            product.productImage = req.file.filename
        }
        if(req.files){
            product.productDescPictures = req.files
        }
        const newProduct = await product.save();
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


module.exports = {
    getProducts, postProduct
}