const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User already registered.');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword
        });

        await user.save();

        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        });
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

router.post('/login', async (req, res) => {
    try {
        const { error } = validateLogin(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Invalid email or password.');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Invalid email or password.');

        const token = user.generateAuthToken();
        res.send({ token });
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().label('Password'),
    });
    return schema.validate(data);
};

router.get('/me', async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.send(user);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
