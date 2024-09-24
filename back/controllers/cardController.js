const Card = require('../models/card');
const { ErrorHandler } = require("../utils/ErrorHandler");

const getAllCards = async (req, res, next) => {
    try {
        const blogs = await Card.find();
        console.log(blogs,'blogs');
        if (!blogs.length) {
            return next(new ErrorHandler("No Cards found", 404));
        }
        res.status(200).json({ success: true, blogs });
    } catch (error) {
        next(error);
    }
};

const getCardById = async (req, res, next) => {
    try {
        const blog = await Card.findById(req.params.id);
        if (!blog) {
            return next(new ErrorHandler("Blog not found", 404));
        }
        res.status(200).json({ success: true, blog });
    } catch (error) {
        next(new ErrorHandler("Invalid blog ID", 400));
    }
};
//     try {
//         const { title, description, slug, createAt } = req.body;

//         const uploadedFile = req.file;
        
//         const imageUrl = uploadedFile
//             ? `${req.protocol}://${req.get('host')}/uploads/${uploadedFile.filename}`
//             : null;

//         const newBlog = await Card.create({
//             title,
//             description,
//             slug,
//             createAt,
//             imageUrl
//         });

//         return res.status(201).json({
//             success: true,
//             newBlog,
//         });
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

const deleteCard = async (req, res, next) => {
    try {
        const blog = await Card.findByIdAndDelete(req.params.id);
        if (!blog) {
            return next(new ErrorHandler("Blog not found", 404));
        }

        return res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
        });
    } catch (error) {
        next(new ErrorHandler("Failed to delete blog", 500));
    }
};

const createCard = async (req, res) => {
    try {
        const { title, description, imageUrl,createdAt } = req.body;
        const newCard = await Card.create({
            title,
            description,
            createdAt,
            imageUrl
        });

        return res.status(201).json({
            success: true,
            newCard,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllCards, getCardById, createCard, deleteCard };
