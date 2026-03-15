const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const User = require("../models/User");
const auth = require("../middleware/auth");

// ================= MULTER CONFIG =================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files allowed"), false);
    }
    cb(null, true);
  }
});

// ================= UPLOAD RESUME =================
router.post("/upload", auth, upload.single("resume"), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.resumePath = req.file.path;
    await user.save();

    res.json({ message: "Resume uploaded successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= CALCULATE ATS SCORE =================
router.get("/score", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.resumePath) {
      return res.status(400).json({ message: "Upload resume first" });
    }

    const dataBuffer = fs.readFileSync(user.resumePath);
    const pdfData = await pdfParse(dataBuffer);

    const text = pdfData.text.toLowerCase();

    const keywords = ["react", "node", "javascript", "mongodb", "sql"];
    let matched = 0;

    keywords.forEach(keyword => {
      if (text.includes(keyword)) matched++;
    });

    const score = Math.round((matched / keywords.length) * 100);

    const suggestions = [];

    keywords.forEach(keyword => {
      if (!text.includes(keyword)) {
        suggestions.push(`Add more details about ${keyword}`);
      }
    });

    user.atsScore = score;
    user.atsSuggestions = suggestions;
    await user.save();

    res.json({
      score,
      suggestions
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
