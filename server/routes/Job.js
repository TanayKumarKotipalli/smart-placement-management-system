const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const auth = require("../middleware/auth");

/* ================= CREATE JOB ================= */

router.post("/create", auth, async (req, res) => {
  try {
    // Allow only recruiters
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Only recruiters can post jobs" });
    }

    // Optional: check recruiter approval
    if (req.user.approvalStatus !== "Approved") {
      return res.status(403).json({ message: "Recruiter not approved by admin" });
    }

    const job = await Job.create({
      ...req.body,
      postedBy: req.user._id,
      company: req.user.companyName || "Company",
      status: "active"
    });

    res.status(201).json(job);

  } catch (err) {
    console.error("CREATE JOB ERROR:", err);
    res.status(500).json({ message: "Job creation failed" });
  }
});

/* ================= GET ALL JOBS ================= */

router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "name email companyName");
    res.json(jobs);
  } catch (err) {
    console.error("FETCH JOBS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

/* ================= MATCHING JOBS (FOR STUDENT) ================= */

router.get("/matching", auth, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can access matching jobs" });
    }

    const student = req.user;

    const jobs = await Job.find({
      status: "active",
      minCGPA: { $lte: student.cgpa },
      maxBacklogs: { $gte: student.backlogs },
      skillsRequired: { $in: student.skills },
      $or: [
        { branches: { $size: 0 } },
        { branches: { $in: [student.branch] } }
      ]
    });

    res.json(jobs);

  } catch (err) {
    console.error("MATCHING ERROR:", err);
    res.status(500).json({ message: "Matching failed" });
  }
});

/* ================= RECRUITER JOBS ================= */

router.get("/recruiter", auth, async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Access denied" });
    }

    const jobs = await Job.find({ postedBy: req.user._id });
    res.json(jobs);

  } catch (err) {
    console.error("RECRUITER JOBS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch recruiter jobs" });
  }
});

module.exports = router;