const Contact = require('../models/contact.model')
const fs = require('fs')

async function getContacts(req, res){
    try {
        const page = req.query.page || 0;
        const limit = req.query.limit || 100;
        const idUser = req.params.idUser
        let filter = req.user.userRole === 'ADMIN_ROLE' ? idUser ? { user: idUser } : {} : { user: req.user._id }
        if(req.query.name) filter = { fullName: { $regex: req.query.name, $options: 'i' } }
        if(req.query.email) filter = { email: { $regex: req.query.email, $options: 'i' } }
        const tickets = await Contact.find(filter)
                                    .skip(page * limit)
                                    .limit(limit)
        const total = await Contact.countDocuments(filter)
        if(tickets.length === 0){
            res.status(404).send({
                ok: false,
                message: "No se han encontrado tickets"
            })
        } else {
            res.status(200).send({
                ok: true,
                message: "Tickets obtenidos correctamente",
                tickets,
                total
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al obtener los tickets"
        })
    }
}

async function getContactById(req, res){
    try {
        const id = req.params.id
        const ticket = await Contact.findById(id)
        if(!ticket){
            res.status(404).send({
                ok: false,
                message: "No se ha encontrado el ticket"
            })
        }
        res.status(200).send({
            ok: true,
            message: "Ticket obtenido correctamente",
            ticket
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al obtener el ticket"
        })
    }
}

async function postContact(req, res){
    try {
        const ticket = new Contact(req.body)
        if(req.files){
            if(req.files.contactImages){
                req.files.contactImages.forEach(image => {
                    ticket.contactImages.push({ name: image.originalname, id: image.filename })
                })
            }
        }
        const newTicket = await ticket.save()

        if(!newTicket){
            return res.status(500).send({
                ok: false,
                message: "Error al crear el ticket"
            })
        }
        res.status(201).send({
            ok: true,
            message: "Ticket creado correctamente",
            ticket: newTicket
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al crear el ticket"
        })
    }
}

async function deleteContact(req, res){
    try {
        const id = req.params.id
        const dltTicket = await Contact.findById(id)
        dltTicket.contactImages.forEach(image => {
            fs.unlinkSync(`./public/images/contact/${image.id}`)
        })

        const deleteTicket = await Contact.findByIdAndDelete(id)
        if(!deleteTicket){
            return res.status(404).send({
                ok: false,
                message: "No se ha encontrado el ticket"
            })
        }
        res.status(200).send({
            ok: true,
            message: "Ticket eliminado correctamente",
            deleteTicket
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al eliminar el ticket"
        })
    }
}



module.exports = {
    getContacts, getContactById, postContact, deleteContact
}