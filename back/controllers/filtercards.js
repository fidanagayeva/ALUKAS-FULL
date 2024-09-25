const Filter = require('../models/filter'); 
const mongoose = require('mongoose');

exports.createFilterCard = async (req, res) => {
    try {
        const filterCard = new Filter({
            name: req.body.name,
            brand: req.body.brand,
            price: req.body.price,
            oldPrice: req.body.oldPrice,
            discount: req.body.discount,
            imageUrl: req.body.imageUrl, 
            material: req.body.material,
            color: req.body.color,
            size: req.body.size,
            availability: req.body.availability || true, 
            tags: req.body.tags, 
            gender: req.body.gender
        });

        await filterCard.save();
        res.status(201).json(filterCard);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getFilterCards = async (req, res) => {
    try {
        const filterCards = await Filter.find();
        res.status(200).json(filterCards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getFilterCardById = async (req, res) => {
    try {
        const filterCard = await Filter.findById(req.params.id);
        if (!filterCard) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.status(200).json(filterCard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateFilterCard = async (req, res) => {
    try {
        const updatedData = {
            name: req.body.name,
            brand: req.body.brand,
            price: req.body.price,
            oldPrice: req.body.oldPrice,
            discount: req.body.discount,
            imageUrl: req.body.imageUrl, 
            material: req.body.material,
            color: req.body.color,
            size: req.body.size,
            availability: req.body.availability,
            tags: req.body.tags, 
            gender: req.body.gender
        };

        const filterCard = await Filter.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!filterCard) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.status(200).json(filterCard);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteFilterCard = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const deletedFilterCard = await Filter.findByIdAndDelete(req.params.id);

        if (!deletedFilterCard) {
            return res.status(404).json({ message: 'Card not found' });
        }

        res.status(200).json({ message: 'Card deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
