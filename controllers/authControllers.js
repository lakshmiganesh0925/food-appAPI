const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
    try {
        const { userName, email, password, phone, address, answer } = req.body;

        // Validate all required fields (including answer if required by schema)
        if (!userName || !email || !password || !phone || !address || !answer) {
            return res.status(400).send({
                success: false,
                message: "Please provide all required fields",
            });
        }

        // Check for existing user
        const existing = await userModel.findOne({ email });
        if (existing) {
            return res.status(400).send({
                success: false,
                message: "Email already registered, please login",
            });
        }

        // Generate salt and hash password
        const salt = await bcrypt.genSalt(10); // Await salt generation
        const hashPassword = await bcrypt.hash(password, salt); // Await hash

        // Create new user
        const user = await userModel.create({
            userName,
            email,
            password: hashPassword,
            address,
            phone,
            answer,
        });

        res.status(201).send({
            success: true,
            message: "Successfully registered",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Register API",
            error,
        });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please provide email and password",
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Invalid credentials",
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: "Invalid credentials",
            });
        }

        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        user.password = undefined; // Remove password from response
        res.status(200).send({
            success: true,
            message: "Login successful",
            token,
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login API",
            error,
        });
    }
};

module.exports = { registerController, loginController };