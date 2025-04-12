const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { Prescription } = require('../models');

// Create a new prescription (only for doctors)
const createPrescription = catchAsync(async (req, res) => {
    const { patientId } = req.params; // Patient ID comes from route parameters
    const prescriptionBody = {
        ...req.body,
        doctor: req.user.id, // Doctor ID comes from req.user
        patient: patientId,
    };
    const prescription = await Prescription.create(prescriptionBody);
    res.status(httpStatus.CREATED).send(prescription);
});

// Get all prescriptions (accessible by both doctors and patients)
const getAllPrescriptions = catchAsync(async (req, res) => {
    let prescriptions;

    if (req.user.role === 'doctor') {
        // If the user is a doctor, fetch prescriptions created by them
        prescriptions = await Prescription.find({ doctor: req.user.id }).populate('doctor patient');
    } else if (req.user.role === 'patient') {
        // If the user is a patient, fetch prescriptions assigned to them
        prescriptions = await Prescription.find({ patient: req.user.id }).populate('doctor patient');
    } else {
        return res.status(httpStatus.FORBIDDEN).send({ message: 'Access denied' });
    }

    res.status(httpStatus.OK).send(prescriptions);
});

// Get a specific prescription by ID (accessible by both doctors and patients)
const getPrescriptionById = catchAsync(async (req, res) => {
    const { prescriptionId } = req.params;
    let prescription;

    if (req.user.role === 'doctor') {
        // Fetch prescription created by the logged-in doctor
        prescription = await Prescription.findOne({ _id: prescriptionId, doctor: req.user.id }).populate('doctor patient');
    } else if (req.user.role === 'patient') {
        // Fetch prescription assigned to the logged-in patient
        prescription = await Prescription.findOne({ _id: prescriptionId, patient: req.user.id }).populate('doctor patient');
    } else {
        return res.status(httpStatus.FORBIDDEN).send({ message: 'Access denied' });
    }

    if (!prescription) {
        return res.status(httpStatus.NOT_FOUND).send({ message: 'Prescription not found' });
    }

    res.status(httpStatus.OK).send(prescription);
});

// Update a prescription by ID (only accessible by doctors)
const updatePrescription = catchAsync(async (req, res) => {
    const { prescriptionId } = req.params;
    const updatedPrescription = await Prescription.findOneAndUpdate(
        { _id: prescriptionId, doctor: req.user.id },
        req.body,
        { new: true, runValidators: true }
    );

    if (!updatedPrescription) {
        return res.status(httpStatus.NOT_FOUND).send({ message: 'Prescription not found' });
    }

    res.status(httpStatus.OK).send(updatedPrescription);
});

// Delete a prescription by ID (only accessible by doctors)
const deletePrescription = catchAsync(async (req, res) => {
    const { prescriptionId } = req.params;
    const prescription = await Prescription.findOneAndDelete({ _id: prescriptionId, doctor: req.user.id });

    if (!prescription) {
        return res.status(httpStatus.NOT_FOUND).send({ message: 'Prescription not found' });
    }

    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createPrescription,
    getAllPrescriptions,
    getPrescriptionById,
    updatePrescription,
    deletePrescription,
};
