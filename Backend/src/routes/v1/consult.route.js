const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { consultController } = require('../../controllers');
const { consultValidation } = require('../../validations');

const router = express.Router();

// Create a new consultation
router.post('/', auth(), validate(consultValidation.createConsult), consultController.createConsult);

// Get all consultations for the logged-in patient
router.get('/', auth(), consultController.getAllConsults);

// Get a specific consultation by ID
router.get('/:consultId', auth(), validate(consultValidation.consultIdValidation), consultController.getConsultById);

// Update a specific consultation by ID
router.put('/:consultId', auth(), validate(consultValidation.consultIdValidation), validate(consultValidation.updateConsult), consultController.updateConsult);

// Delete a specific consultation by ID
router.delete('/:consultId', auth(), validate(consultValidation.consultIdValidation), consultController.deleteConsult);

module.exports = router;
