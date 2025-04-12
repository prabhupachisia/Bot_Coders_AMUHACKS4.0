const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { Consult } = require('../models');

// Create a new consultation
const createConsult = catchAsync(async (req, res) => {
    const consultBody = {
        ...req.body,
        patient: req.user.id, // Patient ID comes from req.user
    };
    const consult = await Consult.create(consultBody);
    res.status(httpStatus.CREATED).send(consult);
});

// Get all consultations for the logged-in patient
const getAllConsults = catchAsync(async (req, res) => {
    const consults = await Consult.find({ patient: req.user.id }).populate('doctor patient');
    res.status(httpStatus.OK).send(consults);
});

// Get a specific consultation by ID for the logged-in patient
const getConsultById = catchAsync(async (req, res) => {
    const { consultId } = req.params;
    const consult = await Consult.findOne({ _id: consultId, patient: req.user.id }).populate('doctor patient');
    if (!consult) {
        return res.status(httpStatus.NOT_FOUND).send({ message: 'Consultation not found' });
    }
    res.status(httpStatus.OK).send(consult);
});

// Update a consultation by ID for the logged-in patient
const updateConsult = catchAsync(async (req, res) => {
    const { consultId } = req.params;
    const updatedConsult = await Consult.findOneAndUpdate(
        { _id: consultId, patient: req.user.id },
        req.body,
        { new: true, runValidators: true }
    );
    if (!updatedConsult) {
        return res.status(httpStatus.NOT_FOUND).send({ message: 'Consultation not found' });
    }
    res.status(httpStatus.OK).send(updatedConsult);
});

// Delete a consultation by ID for the logged-in patient
const deleteConsult = catchAsync(async (req, res) => {
    const { consultId } = req.params;
    const consult = await Consult.findOneAndDelete({ _id: consultId, patient: req.user.id });
    if (!consult) {
        return res.status(httpStatus.NOT_FOUND).send({ message: 'Consultation not found' });
    }
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createConsult,
    getAllConsults,
    getConsultById,
    updateConsult,
    deleteConsult,
};
