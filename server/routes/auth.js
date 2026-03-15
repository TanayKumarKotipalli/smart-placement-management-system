const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
  try {
const {
  name,
  email,
  password,
  mobile,
  cgpa,
  backlogs,
  skills,
  github,
  linkedin,
  tenthMarks,
  interMarks,
  btechMarks
} = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
  name,
  email,
  password: hashedPassword,
  mobile,
  cgpa,
  backlogs,
  skills,
  github,
  linkedin,
  tenthMarks,
  interMarks,
  btechMarks,
  role: req.body.role || "student"
});

    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
  const { name, email, password, role } = req.body;

});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user,
    });

  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});
const crypto = require("crypto");
const nodemailer = require("nodemailer");
/* ================= FORGOT PASSWORD ================= */

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const crypto = require("crypto");

    const token = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    // Instead of sending email, return link
    res.json({
      message: "Reset link generated (Demo Mode)",
      resetLink,
    });

  } catch (err) {
    console.error("FORGOT PASSWORD ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
