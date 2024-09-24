const Autumn = require('../models/autumn');

exports.createAutumnCard = async (req, res) => {
    try {
        const image1 = req.files?.['image1'] ? req.files['image1'][0].path : req.body.image1;  
        const image2 = req.files?.['image2'] ? req.files['image2'][0].path : req.body.image2;  

        const autumnCard = new Autumn({
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

        await autumnCard.save();
        res.status(201).json(autumnCard);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAutumnCards = async (req, res) => {
    try {
        const autumnCards = await Autumn.find();
        res.status(200).json(autumnCards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAutumnCardById = async (req, res) => {
    try {
        const autumnCard = await Autumn.findById(req.params.id);
        if (!autumnCard) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.status(200).json(autumnCard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateAutumnCard = async (req, res) => {
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

        const autumnCard = await Autumn.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!autumnCard) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.status(200).json(autumnCard);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteAutumnCard = async (req, res) => {
    try {
        const autumnCard = await Autumn.findByIdAndDelete(req.params.id);
        if (!autumnCard) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.status(200).json({ message: 'Card deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
