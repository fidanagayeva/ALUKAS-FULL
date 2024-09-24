const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const auth = require('../middleware/auth');

router.get("/me", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;
