const bcrypt = require("bcryptjs");
const Admin = require("../models/adminSchema");
const Counter = require("../models/counterSchema");
const { createToken } = require("../utils/jwt");

const adminSignup = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;


        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin with this email already exists" });
        }


        const counter = await Counter.findOneAndUpdate(
            { _id: 'adminId' },
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        );

        const adminId = counter.sequence_value;


        const hashedPassword = await bcrypt.hash(password, 10);


        const newAdmin = new Admin({
            adminId,
            name,
            email,
            phone,
            password: hashedPassword
        });

        await newAdmin.save();

        res.status(201).json({
            message: "Admin created successfully!",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

const adminSignin = async (req, res) => {
    try {
        const { email, password } = req.body;


        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isValidPassword = await bcrypt.compare(password, admin.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = createToken({ adminId: admin.adminId, email: admin.email });

        res.status(200).json({
            message: "Admin signed in successfully!",
            token
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

module.exports = { adminSignup, adminSignin };
