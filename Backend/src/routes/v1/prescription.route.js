const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../..//middlewares/validate');
const { prescriptionController } = require('../../controllers');
const {prescriptionValidation} = require('../../validations');

const router = express.Router();

// Create a new prescription for a specific patient (only accessible by doctors)
router.post('/:patientId', auth(), validate(prescriptionValidation.createPrescription), prescriptionController.createPrescription);

// Get all prescriptions (accessible by both doctors and patients)
router.get('/', auth(), prescriptionController.getAllPrescriptions);

// Get a specific prescription by ID (accessible by both doctors and patients)
router.get('/:prescriptionId', auth(), validate(prescriptionValidation.prescriptionIdValidation), prescriptionController.getPrescriptionById);

// Update a specific prescription by ID (only accessible by doctors)
router.patch('/:prescriptionId', auth(), validate(prescriptionValidation.prescriptionIdValidation), validate(prescriptionValidation.updatePrescription), prescriptionController.updatePrescription);

// Delete a specific prescription by ID (only accessible by doctors)
router.delete('/:prescriptionId', auth(), validate(prescriptionValidation.prescriptionIdValidation), prescriptionController.deletePrescription);

module.exports = router;
