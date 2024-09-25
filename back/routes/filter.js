const express = require('express');
const filtercards = require('../controllers/filtercards');
const router = express.Router();

router.post('/create', filtercards.createFilterCard);

router.get('/cards', filtercards.getFilterCards);

router.get('/cards/:id', filtercards.getFilterCardById);

router.put('/cards/:id', filtercards.updateFilterCard);

router.delete('/cards/:id', filtercards.deleteFilterCard);

module.exports = router;
