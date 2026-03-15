const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const Job = require("../models/Job");
const multer = require("multer");
const path = require("path");

/* ================= PROFILE ================= */

router.get("/profile", auth, async (req, res) => {
  try {
    res.json({ ...req.user._doc, password: undefined });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/profile", auth, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= RECOMMENDED JOBS ================= */

router.get("/recommended", auth, async (req, res) => {
  try {
    const student = req.user;

    if (student.role !== "student") {
      return res.status(403).json({ message: "Access denied" });
    }

    const jobs = await Job.find();

    const recommended = jobs
      .map(job => {
        const jobSkills = job.skillsRequired || [];
        const studentSkills = student.skills || [];

        const matchedSkills = jobSkills.filter(skill =>
          studentSkills.includes(skill)
        );

        const compatibility =
          jobSkills.length === 0
            ? 0
            : Math.round((matchedSkills.length / jobSkills.length) * 100);

        return {
          ...job._doc,
          compatibility
        };
      })
      .filter(job => job.compatibility > 0)
      .sort((a, b) => b.compatibility - a.compatibility);

    res.json(recommended);

  } catch (err) {
    console.error("RECOMMENDED ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});
/* ================= RESUME UPLOAD ================= */

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      cb(new Error("Only PDF allowed"));
    } else cb(null, true);
  },
});

router.post("/resume/upload", auth, upload.single("resume"), async (req, res) => {
  try {
    req.user.resumePath = req.file.path;
    await req.user.save();

    res.json({ message: "Resume uploaded", path: req.file.path });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/ats", auth, async (req, res) => {
  try {
    const user = req.user;

    if (!user.resumePath) {
      return res.status(400).json({ message: "Resume not uploaded" });
    }

    let score = 50;
    let suggestions = [];

    if (user.skills.length < 3) {
      suggestions.push("Add more relevant technical skills.");
      score -= 10;
    }

    if (!user.github) {
      suggestions.push("Add GitHub profile.");
      score -= 5;
    }

    if (!user.linkedin) {
      suggestions.push("Add LinkedIn profile.");
      score -= 5;
    }

    if (user.cgpa < 7) {
      suggestions.push("Improve CGPA or highlight projects.");
      score -= 10;
    }

    res.json({
      score: Math.max(score, 0),
      suggestions,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;