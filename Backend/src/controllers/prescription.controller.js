const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { Prescription } = require('../models');
const { Doctor } = require('../models');

// Create a new prescription (only for doctors)
const createPrescription = catchAsync(async (req, res) => {
    const { consultationId } = req.params;
    const prescription = await Prescription.create({
        ...req.body,
        consultation: consultationId,
        doctor: req.user.id,
        patient: (await Consultation.findById(consultationId)).patient
    });
    res.status(httpStatus.CREATED).send(prescription);
});

const getConsultationPrescriptions = catchAsync(async (req, res) => {
    const { consultationId } = req.params;
    const prescriptions = await Prescription.find({ consultation: consultationId })
        .populate('doctor patient consultation');
    res.send(prescriptions);
});

const getPrescription = catchAsync(async (req, res) => {
    const { consultationId, prescriptionId } = req.params;
    const prescription = await Prescription.findOne({
        _id: prescriptionId,
        consultation: consultationId
    }).populate('doctor patient consultation');

    if (!prescription) {
        return res.status(httpStatus.NOT_FOUND).send('Prescription not found');
    }
    res.send(prescription);
});

const updatePrescription = catchAsync(async (req, res) => {
    const { consultationId, prescriptionId } = req.params;
    const prescription = await Prescription.findOneAndUpdate(
        { _id: prescriptionId, consultation: consultationId, doctor: req.user.id },
        req.body,
        { new: true, runValidators: true }
    );
    res.send(prescription);
});

const deletePrescription = catchAsync(async (req, res) => {
    const { consultationId, prescriptionId } = req.params;
    await Prescription.deleteOne({
        _id: prescriptionId,
        consultation: consultationId,
        doctor: req.user.id
    });
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createPrescription,
    getConsultationPrescriptions,
    getPrescription,
    updatePrescription,
    deletePrescription,
};
