const Joi = require('joi')

const productSchema = Joi.object({
    productName: Joi.string().min(3).max(100).trim().messages({
        'string.base': 'El nombre debe ser una cadena de texto',
        'string.empty': 'El nombre no puede estar vacio',
        'string.min': 'La cantidad de caracteres minima es 3',
        'string.max': 'La cantidad de caracteres maxima es 100'
    }),
    productsPrice: Joi.number().min(0).max(999999)
})

module.exports = productSchema