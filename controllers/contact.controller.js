const Contact = require('../models/contact.model')
const fs = require('fs')

async function getContacts(req, res){
    try {
        const tickets = Contact.find()
        if(tickets.length === 0){
            res.status(404).send({
                ok: false,
                message: "No se han encontrado tickets"
            })
        }
        res.status(200).send({
            ok: true,
            message: "Tickets obtenidos correctamente",
            tickets
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al obtener los tickets"
        })
    }
}

async function getContactById(res, req){
    try {
        const id = req.params.id
        const ticket = Contact.findById(id)
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


module.exports = {
    getContacts, getContactById, postContact
}