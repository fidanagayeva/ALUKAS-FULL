const mongoose = require('mongoose');

const filterSchema = new mongoose.Schema({
    material: { type: String }, 
    color: { type: String }, 
    size: { type: String }, 
    availability: { type: Boolean }, 
    tags: [String], 
   gender: { type: String }, 
    price: { type: Number }, 
    name: { type: String }, 
    imageUrl: { type: String } 
});

filterSchema.statics.filterProducts = async function (filters) {
    let query = {};

    if (filters.material) {
        query.material = filters.material;
    }

    if (filters.color) {
        query.color = filters.color;
    }

    if (filters.size) {
        query.size = filters.size;
    }

    if (filters.availability !== undefined) {
        query.availability = filters.availability;
    }

    if (filters.tags && filters.tags.length > 0) {
        query.tags = { $in: filters.tags }; 
    }

    if (filters.gender) {
        query.gender = filters.gender;
    }

    if (filters.minPrice || filters.maxPrice) {
        query.price = {};
        if (filters.minPrice) {
            query.price.$gte = filters.minPrice; 
        }
        if (filters.maxPrice) {
            query.price.$lte = filters.maxPrice; 
        }
    }

    if (filters.name) {
        query.name = { $regex: filters.name, $options: 'i' }; 
    }

    if (filters.imageUrl) {
        query.imageUrl = { $regex: filters.imageUrl, $options: 'i' }; 
    }

    const products = await mongoose.model('Product').find(query);
    return products;
};

module.exports = mongoose.model('Filter', filterSchema);
