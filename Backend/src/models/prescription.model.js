const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const prescriptionSchema = mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
},{
    timestamps: true,
});
