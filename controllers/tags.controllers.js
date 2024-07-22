const Tag = require('../models/tag.model')

async function getTags(req, res) {
    try {
        const tags = await Tag.find()
        if (tags.length > 0) {
            res.status(200).send({
                ok: true,
                message: "Tags obtenidos correctamente",
                tags
            })
        } else {
            res.status(404).send({
                ok: false,
                message: "No se han encontrado tags"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al obtener los tags"
        })
    }
}
async function getTagById(req, res) {
    try {
        const id = req.params.id
        const tag = await Tag.findById(id)
        if (tag) {
            res.status(200).send({
                ok: true,
                message: "Tag obtenido correctamente",
                tag
            })
        } else {
            res.status(404).send({
                ok: false,
                message: "No se ha encontrado el tag"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al obtener el tag"
        })
    }
}
async function postTag(req, res) {
    try {
        const tag = new Tag(req.body)
        const newTag = await tag.save();
        if(newTag){
            res.status(200).send({
                ok: true,
                message: "Tag creado correctamente",
                tag: tag
            })
        } else {
            res.status(500).send({
                ok: false,
                message: "Error al crear el tag"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al crear el tag"
        })
    }
}
async function editTag(req, res) {
    try {
        const id = req.params.id
        const editTag = req.body
        const editedTag = await Tag.findByIdAndUpdate(id, editTag, { new: true })
        if(editedTag){
            res.status(200).send({
                ok: true,
                message: "Tag editado correctamente",
                editedTag
            })
        } else {
            res.status(500).send({
                ok: false,
                message: "Error al editar el tag"
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al editar el tag"
        })
    }
}
async function deleteTag(req, res) {
    try {
        const id = req.params.id
        const deletedTag = await Tag.findByIdAndDelete(id)
        if(deletedTag){
            res.status(200).send({
                ok: true,
                message: "Tag eliminado correctamente",
                deletedTag
            })
        } else {
            res.status(500).send({
                ok: false,
                message: "Error al eliminar el tag"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al eliminar el tag"
        })
    }
}

module.exports = { 
    getTags, getTagById, postTag, editTag, deleteTag
}