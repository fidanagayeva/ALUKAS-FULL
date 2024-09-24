const Trendy = require('../models/trendy');
const mongoose = require('mongoose'); 

exports.createTrendyCard = async (req, res) => {
    try {
        const image1 = req.files?.['image1'] ? req.files['image1'][0].path : req.body.image1;  
        const image2 = req.files?.['image2'] ? req.files['image2'][0].path : req.body.image2;  

        const trendyCard = new Trendy({
            name: req.body.name,
            price: req.body.price,
            old_price: req.body.old_price,
            discount: req.body.discount,
            brand: req.body.brand,
            label: req.body.label,
            description: req.body.description,
            image1: image1, 
            image2: image2,  
            status: req.body.status || 'active' 
        });

        await trendyCard.save();
        res.status(201).json(trendyCard);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getTrendyCards = async (req, res) => {
    try {
        const trendyCards = await Trendy.find();
        res.status(200).json(trendyCards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTrendyCardById = async (req, res) => {
    try {
        const trendyCard = await Trendy.findById(req.params.id);
        if (!trendyCard) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.status(200).json(trendyCard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTrendyCard = async (req, res) => {
    try {
        const image1 = req.files?.['image1'] ? req.files['image1'][0].path : undefined;
        const image2 = req.files?.['image2'] ? req.files['image2'][0].path : undefined;

        const updatedData = {
            name: req.body.name,
            price: req.body.price,
            old_price: req.body.old_price,
            discount: req.body.discount,
            brand: req.body.brand,
            label: req.body.label,
            description: req.body.description,
            status: req.body.status,
        };

        if (image1) updatedData.image1 = image1;  
        if (image2) updatedData.image2 = image2;  

        const trendyCard = await Trendy.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!trendyCard) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.status(200).json(trendyCard);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.deleteTrendyCard = async (req, res) => {
    try {
        console.log('method')

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        console.log('delete trendy card: ', req.params.id)

        const deletedTrendyCard = await Trendy.findByIdAndDelete(req.params.id);

        if (!deletedTrendyCard) {
            return res.status(404).json({ message: 'Card not found' });
        }

        console.log('result: ', this.deleteTrendyCard)

        res.status(200).json({ message: 'Card deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

