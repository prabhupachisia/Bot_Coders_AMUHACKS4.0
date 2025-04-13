const express = require('express');
const { hospitalController } = require('../../controllers');
const auth = require('../../middlewares/auth'); // Middleware for authentication
const router = express.Router();

router.get('/:id/doctors', auth(), hospitalController.getDoctorsByHospital);
router.get('/', auth(), hospitalController.getAllHospitals);

module.exports = router;
