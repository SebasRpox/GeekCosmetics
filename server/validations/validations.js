const Joi = require('@hapi/joi');

const validation_addReport = Joi.object({
    orden: Joi.number().required(),
    nombre: Joi.string().required(), 
    articulo: Joi.string().required(), 
    cantidad: Joi.number().required(), 
    subtotal: Joi.number().required()
});

const validation_addReportTotal = Joi.object({
    subtotal: Joi.number().required(),
    iva: Joi.number().required(), 
    total: Joi.number().required()
});

const validation_numOrden = Joi.object({
    numOrden: Joi.number().required()
});

module.exports = { validation_addReport, validation_addReportTotal, validation_numOrden }