const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Application = require("../models/Application");
const Job = require("../models/Job");

/* ================= APPLY ================= */

router.post("/apply/:jobId", auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const existing = await Application.findOne({
      student: req.user._id,
      job: job._id,
    });

    if (existing)
      return res.status(400).json({ message: "Already applied" });

    const matchCount = job.skillsRequired.filter(skill =>
      req.user.skills.includes(skill)
    ).length;

    const compatibility =
      job.skillsRequired.length > 0
        ? Math.round((matchCount / job.skillsRequired.length) * 100)
        : 0;

    const application = new Application({
      student: req.user._id,
      job: job._id,
      compatibilityScore: compatibility,
      status: "Applied",
    });

    await application.save();
    res.status(201).json({ message: "Application recorded" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= STUDENT APPLICATIONS ================= */

router.get("/my", auth, async (req, res) => {
  try {
    const applications = await Application.find({
      student: req.user._id,
    }).populate("job");

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= RECRUITER APPLICATIONS ================= */

router.get("/recruiter", auth, async (req, res) => {
  try {
    const recruiterJobs = await Job.find({
      postedBy: req.user._id,
    });

    const jobIds = recruiterJobs.map(job => job._id);

    const applications = await Application.find({
      job: { $in: jobIds },
    })
      .populate("student")
      .populate("job");

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= UPDATE STATUS ================= */

router.put("/update/:applicationId", auth, async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Applied",
      "Shortlisted",
      "Interview",
      "Selected",
      "Rejected",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const applicationId = req.params.applicationId;

    if (!applicationId) {
      return res.status(400).json({ message: "Application ID missing" });
    }

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;

    await application.save();

    console.log("Status updated to:", status);

    res.json({
      message: "Status updated successfully",
      updatedStatus: application.status,
    });

  } catch (err) {
    console.error("🔥 UPDATE ERROR:", err);
    res.status(500).json({
      message: "Server error during update",
      error: err.message,
    });
  }
});

module.exports = router;