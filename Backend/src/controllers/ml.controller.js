// controllers/mlUploadController.js
const axios = require('axios');
const { cloudinary } = require('../config/cloudinary.config');
const MLModel = require('../models/ml.model');

const uploadMLPhotos = async (req, res) => {
    try {
        // 1. Upload images to Cloudinary
        const uploadPromises = req.files.map(file =>
            cloudinary.uploader.upload(file.path, { folder: 'ml-uploads' })
        );
        const cloudinaryResults = await Promise.all(uploadPromises);
        const photoUrls = cloudinaryResults.map(r => r.secure_url);

        // 2. Save to MongoDB
        const mlEntry = await MLModel.create({
            consult: req.body.consultId,
            photos: photoUrls
        });

        // 3. Call Flask ML Server for each image individually
        const mlRequests = photoUrls.map(url =>
            axios.post('http://localhost:8080/predict', {
                image_url: url  // Note singular 'image_url' to match Flask endpoint
            })
        );

        // Handle responses with allSettled to process partial successes
        const mlResponses = await Promise.allSettled(mlRequests);

        // Process results
        const results = mlResponses.map((response, index) => ({
            image_url: photoUrls[index],
            status: response.status,
            data: response.status === 'fulfilled' ? response.value.data : response.reason.response?.data || 'Request failed'
        }));

        res.status(201).json({
            success: true,
            cloudinaryUrls: photoUrls,
            mlResults: results,
            databaseEntry: mlEntry
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: `Processing Error: ${error.message}`,
            details: error.response?.data || 'Check server logs for details'
        });
    }
};
