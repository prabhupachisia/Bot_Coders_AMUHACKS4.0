const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {Doctor} = require('../models');

const createDoctor = catchAsync(async (req, res) => {
    const { hospitalId } = req.params;
    const doctorBody = {
        ...req.body,
        hospital: hospitalId,
    };
    const doctor = await Doctor.create(doctorBody);
    res.status(httpStatus.CREATED).send(doctor);
});

const getAllDoctors = catchAsync(async (req, res) => {
    const doctors = await Doctor.find().populate('hospital details');
    res.status(httpStatus.OK).send(doctors);
});

const getDoctorById = catchAsync(async (req, res) => {
    const { doctorId } = req.params;
    const doctor = await Doctor.findById(doctorId).populate('hospital details');
    if (!doctor) {
        return res.status(httpStatus.NOT_FOUND).send({ message: 'Doctor not found' });
    }
    res.status(httpStatus.OK).send(doctor);
});

const updateDoctor = catchAsync(async (req, res) => {
    const { doctorId } = req.params;
    const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, req.body, { new: true, runValidators: true });
    if (!updatedDoctor) {
        return res.status(httpStatus.NOT_FOUND).send({ message: 'Doctor not found' });
    }
    res.status(httpStatus.OK).send(updatedDoctor);
});

const deleteDoctor = catchAsync(async (req, res) => {
    const { doctorId } = req.params;
    const doctor = await Doctor.findByIdAndDelete(doctorId);
    if (!doctor) {
        return res.status(httpStatus.NOT_FOUND).send({ message: 'Doctor not found' });
    }
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
};
