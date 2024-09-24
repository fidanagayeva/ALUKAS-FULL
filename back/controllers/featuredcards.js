const Featured = require('../models/featured');

exports.createFeaturedCard = async (req, res) => {
    try {
        const image1 = req.files?.['image1'] ? req.files['image1'][0].path : req.body.image1;  
        const image2 = req.files?.['image2'] ? req.files['image2'][0].path : req.body.image2;  

        const featuredCard = new Featured({
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

        await featuredCard.save();
        res.status(201).json(featuredCard);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getFeaturedCards = async (req, res) => {
    try {
        const featuredCards = await Featured.find();
        res.status(200).json(featuredCards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getFeaturedCardById = async (req, res) => {
    try {
        const featuredCard = await Featured.findById(req.params.id);
        if (!featuredCard) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.status(200).json(featuredCard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateFeaturedCard = async (req, res) => {
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

        const featuredCard = await Featured.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!featuredCard) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.status(200).json(featuredCard);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteFeaturedCard = async (req, res) => {
    try {
        const featuredCard = await Featured.findByIdAndDelete(req.params.id);
        if (!featuredCard) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.status(200).json({ message: 'Card deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
