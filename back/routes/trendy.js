const express = require('express');
const router = express.Router();
const trendyController = require('../controllers/trendycards');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

router.post('/', upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }]), trendyController.createTrendyCard);
router.get('/', trendyController.getTrendyCards);
router.get('/:id', trendyController.getTrendyCardById);
router.put('/:id', upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }]), trendyController.updateTrendyCard);
router.delete('/:id', trendyController.deleteTrendyCard);

module.exports = router;
