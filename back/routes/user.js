const router = require("express").Router();
const { User, validate, validateLogin, validateUser } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) return res.status(400).send({ message: "User with given email already exists!" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword
        });

        await newUser.save();

        const token = newUser.generateAuthToken();
        res.header('x-auth-token', token).status(201).send({ message: "User created successfully", token });
    } catch (error) {
        console.error("Error during user registration:", error); 
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Login user
router.post("/login", async (req, res) => {
    console.log('Login method worked')
    try {
        console.log('request body: ', req.body)
        const { error } = validateLogin(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });
        
        console.log('No problem with validate login')

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).send({ message: "Invalid Email or Password" });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(401).send({ message: "Invalid Email or Password" });

        const token = user.generateAuthToken();
        res.status(200).send({ message: "Logged in successfully", token });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;
