const Joi = require('joi');

// Validation for creating a new consultation
const createConsult = {
    body: Joi.object().keys({
        doctor: Joi.string().required().length(24),
        description: Joi.string().required(),
        date: Joi.date().required(),
        time: Joi.string().required(),
        status: Joi.string().valid('pending', 'completed', 'cancelled').default('pending'),
    }),
};

// Validation for updating a consultation
const updateConsult = {
    body: Joi.object()
        .keys({
            doctor: Joi.string().length(24),
            description: Joi.string(),
            date: Joi.date(),
            time: Joi.string(),
            status: Joi.string().valid('pending', 'completed', 'cancelled'),
        })
        .min(1), // At least one field must be provided for update
};

// Validation for getting or deleting consultations by ID
const consultIdValidation = {
    params: Joi.object().keys({
        consultId: Joi.string().required().length(24),
    }),
};

module.exports = {
    createConsult,
    updateConsult,
    consultIdValidation,
};
