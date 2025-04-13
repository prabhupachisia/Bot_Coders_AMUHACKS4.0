const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPrescription = {
    body: Joi.object().keys({
        description: Joi.string().required(),
        medicines: Joi.array().items(
            Joi.object({
                name: Joi.string().required(),
                dosage: Joi.string().required(),
                duration: Joi.string().required()
            })
        )
    })
};

const updatePrescription = {
    body: Joi.object().keys({
        description: Joi.string(),
        medicines: Joi.array().items(
            Joi.object({
                name: Joi.string(),
                dosage: Joi.string(),
                duration: Joi.string()
            })
        )
    }).min(1)
};

const prescriptionIdValidation = {
    params: Joi.object().keys({
        prescriptionId: Joi.string().custom(objectId).required(),
        consultationId: Joi.string().custom(objectId).required()
    })
};

module.exports = {
    createPrescription,
    updatePrescription,
    prescriptionIdValidation
};
