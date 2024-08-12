const FavList = require('../models/userFavList.model')

async function getFavLists(req, res) {
    try {
        const list = await FavList.find()
            .populate({
                path: "favList",
                select: "productName productImage productTags productPrice ",
                populate: {
                    path: "productTags"
                }
            })
        if (list.length === 0) {
            return res.status(404).send({
                ok: false,
                message: "No se encontraron listas"
            })
        }
        res.status(200).send({
            ok: true,
            message: "Listas obtenidas correctamente",
            list
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al obtener las listas"
        })
    }
}

async function getFavListByUserId(req, res) {
    try {
        const id = { user: req.params.id }
        const list = await FavList.find(id)
            .populate({
                path: "favList",
                select: "productName productImage productTags productPrice ",
                populate: {
                    path: "productTags"
                }
            })

        if (!list) {
            return res.status(404).send({
                ok: false,
                message: "No se encontro la lista"
            })
        }
        res.status(200).send({
            ok: true,
            message: "Lista obtenida correctamente",
            list
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al obtener las listas"
        })
    }
}

async function postFavList(req, res) {
    try {
        const favList = new FavList(req.body)
        const newFavList = await favList.save()
        if (!newFavList) {
            return res.status(500).send({
                ok: false,
                message: "Error al crear la lista"
            })
        }
        res.status(201).send({
            ok: true,
            message: "Lista creada correctamente",
            newFavList
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al crear la lista"
        })
    }
}

async function updateFavList(req, res) {
    try {
        const id = req.params.id
        const uptFavList = req.body
        const updatedFavList = await FavList.findByIdAndUpdate(id, uptFavList, { new: true })
        if (!updatedFavList) {
            return res.status(500).send({
                ok: false,
                message: "Error al editar la lista"
            })
        }
        res.status(200).send({
            ok: true,
            message: "Lista editada correctamente",
            updatedFavList
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al editar la lista"
        })
    }


}

module.exports = {
    getFavLists, getFavListByUserId, postFavList, updateFavList
}
