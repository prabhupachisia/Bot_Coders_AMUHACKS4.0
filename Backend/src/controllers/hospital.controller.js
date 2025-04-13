const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { Doctor, User } = require('../models'); // Adjust the path as needed

/**
 * Get all doctors related to a specific hospital
 */
const getDoctorsByHospital = catchAsync(async (req, res) => {
    const { hospitalId } = req.params; // Extract hospital ID from request parameters

    // Fetch all doctors related to the hospital
    const doctors = await Doctor.find({ hospital: hospitalId }).populate('details', 'name email'); // Populate 'details' field if needed

    if (!doctors || doctors.length === 0) {
        return res.status(httpStatus.NOT_FOUND).send({ message: 'No doctors found for this hospital' });
    }

    res.status(httpStatus.OK).send({ doctors });
});

const getAllHospitals = catchAsync(async (req, res) => {
    // Find users with role 'hospital'
    const hospitals = await User.find({ role: 'hospital' });

    if (!hospitals || hospitals.length === 0) {
        return res.status(httpStatus.NOT_FOUND).send({ message: 'No hospitals found' });
    }

    res.status(httpStatus.OK).send(hospitals);
});


module.exports = {
    getDoctorsByHospital,
    getAllHospitals
};
