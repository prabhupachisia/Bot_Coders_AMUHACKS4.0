const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const prescriptionController = require('../../controllers/prescription.controller');

const router = express.Router();

// Create a new prescription (requires consultation ID)
router.post(
    '/consultations/:consultationId',
    auth('doctor'),
    prescriptionController.createPrescription
);

// Get all prescriptions for a consultation (requires consultation ID)
router.get(
    '/consultations/:consultationId',
    auth(['doctor', 'patient']),
    prescriptionController.getConsultationPrescriptions
);

// Get/Update/Delete a prescription (uses prescription ID only)
router.get(
    '/:prescriptionId',
    auth(['doctor', 'patient']),
    prescriptionController.getPrescription
);

router.patch(
    '/:prescriptionId',
    auth('doctor'),
    prescriptionController.updatePrescription
);

router.delete(
    '/:prescriptionId',
    auth('doctor'),
    prescriptionController.deletePrescription
);

module.exports = router;
