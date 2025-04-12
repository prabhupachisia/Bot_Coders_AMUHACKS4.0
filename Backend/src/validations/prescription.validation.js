const Joi = require('joi');

// Validation for creating a new prescription
const createPrescription = {
    body: Joi.object().keys({
        description: Joi.string().required(),
    }),
    params: Joi.object().keys({
        patientId: Joi.string().required().length(24),
    }),
};

// Validation for updating a prescription
const updatePrescription = {
    body: Joi.object()
        .keys({
            description: Joi.string(),
        })
        .min(1), // At least one field must be provided for update
};

// Validation for getting or deleting prescriptions by ID
const prescriptionIdValidation = {
    params: Joi.object().keys({
        prescriptionId: Joi.string().required().length(24),
    }),
};

module.exports = {
    createPrescription,
    updatePrescription,
    prescriptionIdValidation,
};
