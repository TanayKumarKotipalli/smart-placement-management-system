const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");

// ================= ADMIN MIDDLEWARE =================
const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
  next();
};

// ================= GET ALL USERS =================
router.get("/users", auth, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error("FETCH USERS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ================= BLOCK / UNBLOCK USER =================
router.put("/block/:id", auth, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "admin") {
      return res.status(400).json({ message: "Cannot block another admin" });
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.json({ message: "User status updated" });

  } catch (err) {
    console.error("BLOCK USER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ================= GET ALL JOBS =================
router.get("/jobs", auth, adminOnly, async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "name email");
    res.json(jobs);
  } catch (err) {
    console.error("FETCH JOBS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ================= DELETE JOB =================
router.delete("/delete-job/:id", auth, adminOnly, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Also delete related applications
    await Application.deleteMany({ job: job._id });

    await job.deleteOne();

    res.json({ message: "Job deleted successfully" });

  } catch (err) {
    console.error("DELETE JOB ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;