const mongoose = require('mongoose');

const featuredSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: String,
        required: false,
    },
    image1: {
        type: String,  
        required: true,
    },
    image2: {
        type: String,  
        required: true,
    },
    label: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        default: 'active',
    },
});

const Featured = mongoose.model('Featured', featuredSchema);
module.exports = Featured;
