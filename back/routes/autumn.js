const express = require('express');
const router = express.Router();
const autumnController = require('../controllers/autumncards');
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

router.post('/', upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }]), autumnController.createAutumnCard);
router.get('/', autumnController.getAutumnCards);
router.get('/:id', autumnController.getAutumnCardById);
router.put('/:id', upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }]), autumnController.updateAutumnCard);
router.delete('/:id', autumnController.deleteAutumnCard);

module.exports = router;
