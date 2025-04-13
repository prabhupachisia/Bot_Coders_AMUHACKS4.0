const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const prescriptionController = require('../../controllers/prescription.controller');
const prescriptionValidation = require('../../validations/prescription.validation');

const router = express.Router({ mergeParams: true });

// Create prescription for specific consultation
router.post(
    '/',
    auth('doctor'),
    validate(prescriptionValidation.createPrescription),
    prescriptionController.createPrescription
);

// Get all prescriptions for a consultation
router.get(
    '/',
    auth(['doctor', 'patient']),
    prescriptionController.getConsultationPrescriptions
);

// Get specific prescription in consultation
router.get(
    '/:prescriptionId',
    auth(['doctor', 'patient']),
    validate(prescriptionValidation.prescriptionIdValidation),
    prescriptionController.getPrescription
);

// Update prescription in consultation
router.patch(
    '/:prescriptionId',
    auth('doctor'),
    validate(prescriptionValidation.updatePrescription),
    prescriptionController.updatePrescription
);

// Delete prescription in consultation
router.delete(
    '/:prescriptionId',
    auth('doctor'),
    validate(prescriptionValidation.prescriptionIdValidation),
    prescriptionController.deletePrescription
);

module.exports = router;
