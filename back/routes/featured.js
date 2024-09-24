const express = require('express');
const router = express.Router();
const featuredController = require('../controllers/featuredcards');
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

router.post('/', upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }]), featuredController.createFeaturedCard);
router.get('/', featuredController.getFeaturedCards);
router.get('/:id', featuredController.getFeaturedCardById);
router.put('/:id', upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }]), featuredController.updateFeaturedCard);
router.delete('/:id', featuredController.deleteFeaturedCard);

module.exports = router;
