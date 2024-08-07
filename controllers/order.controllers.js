const Order = require('../models/order.model')
const Product = require('../models/products.model')
async function getOrders(req, res) {
    try {
        const page = req.query.page || 0;
        const limit = req.query.limit || 100;
        const idUser = req.params.idUser
        let filter = req.user.userRole === 'ADMIN_ROLE' ?
            idUser ? { user: idUser } : {} : { user: req.user._id }
        if(req.query.name) filter = { userName: { $regex: req.query.name, $options: 'i'} }
        if(req.query.email) filter = { userEmail: { $regex: req.query.email, $options: 'i'} }
        console.log(filter)
        const orders = await Order.find(filter)
            .populate("user", "userName userEmail")
            .populate("products.product", "productName productImage productPrice")
            .skip(page * limit)
            .limit(limit)
        const total = await Order.countDocuments(filter)
        if (!orders) {
            res.status(404).send({
                ok: false,
                message: "No se han encontrado ordenes"
            })
        }
        res.status(200).send({
            ok: true,
            message: "Ordenes obtenidas correctamente",
            orders,
            total
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al obtener las ordenes"
        })
    }
}

async function getOrderById(req, res) {
    try {
        const id = req.params.id
        const order = await Order.findById(id).populate("user", "userName userEmail").populate("products.product")
        if (!order) {
            res.status(404).send({
                ok: false,
                message: "No se ha encontrado la orden"
            })
        }
        res.status(200).send({
            ok: false,
            message: "Orden obtenida correctamente",
            order
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al obtener la orden",
            error
        })
    }
}

async function checkPrices(products, total) {
    try {
        let totalOrder = 0
        for (let prod of products) {
            totalOrder += prod.price * prod.quantity
            const product = await Product.findById(prod.product)
            if (!product || product.productPrice !== prod.price) {
                throw new Error(`El producto no existe o su precio no coincide`)
            }
        }
        if (totalOrder !== total) {
            throw new Error("El total no es correcto")
        }
    } catch (error) {
        console.log(error)
        throw new Error("Error al verificar el precio de productos")
    }
}
async function setTimesSold(products){
    try {
        for(let prod of products){
            const product = await Product.findById(prod.product)
            product.timesSold += prod.quantity
            await Product.findByIdAndUpdate(product._id, product)
        }
    } catch (error) {
        console.log(error)
    }
} 
async function postOrder(req, res) {
    try {
        if (req.user._id !== req.body.user) {
            return res.status(400).send({
                ok: false,
                message: 'Los datos de autenticacion no coinciden.'
            })
        }
        if (req.body.products.length === 0) {
            return res.status(400).send({
                ok: false,
                message: "La orden debe tener al menos un producto."
            })
        }
        await checkPrices(req.body.products, req.body.total)
        const order = new Order(req.body)
        const newOrder = await order.save()
        await setTimesSold(req.body.products)
        if (!newOrder) {
            res.status(500).send({
                ok: false,
                message: "Error al crear la orden",
            })
        }
        res.status(201).send({
            ok: true,
            message: "Orden creada correctamente",
            order: newOrder
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al crear la orden.",
            error
        })
    }
}

async function deleteOrder(req, res) {
    try {
        const id = req.params.id
        const deletedOrder = await Order.findByIdAndDelete(id)
        if (!deletedOrder) {
            res.status(500).send({
                ok: false,
                message: "Error al borrar la orden",
            })
        }
        res.status(200).send({
            ok: true,
            message: "Orden eliminada correctamente",
            order: deletedOrder
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al borrar la orden",
            error
        })
    }
}

module.exports = { getOrders, postOrder, getOrderById, deleteOrder }