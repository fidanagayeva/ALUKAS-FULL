const express = require("express");
const router = express.Router();
const { getAllCards, getCardById, deleteCard, createCard } = require("../controllers/cardController");

router.get("/", getAllCards);
router.get("/:id", getCardById);
router.delete("/:id", deleteCard);
router.post("/", createCard);

module.exports = router;
