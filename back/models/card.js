const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
