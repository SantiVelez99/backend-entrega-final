const Product = require('../models/products.model')


async function getProducts(req, res){
    try {
        const products = await Product.find()
        if(products){
            res.status(200).send({
                ok: true,
                message: "Get exitoso",
                products: products
            })
        }
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
        if(req.files){
            req.files.productImage?.forEach(image => {
                product.productImage = {name: image.originalname, id: image.filename}
            })
            req.files.productDescPictures?.forEach(image =>{
                product.productDescPictures.push({name: image.originalname, id: image.filename})
            })
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