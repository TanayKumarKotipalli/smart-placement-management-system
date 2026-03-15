const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    company: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    skillsRequired: {
      type: [String],
      default: []
    },

    branches: {
      type: [String],
      default: []
    },

    minCGPA: {
      type: Number,
      default: 0
    },

    maxBacklogs: {
      type: Number,
      default: 0
    },

    salary: {
      type: String,
      default: ""
    },

    jobType: {
      type: String,
      enum: ["Internship", "Full-time", "Contract"],
      default: "Full-time"
    },

    location: {
      type: String,
      default: ""
    },

    deadline: {
      type: Date
    },

    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active"
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Job || mongoose.model("Job", jobSchema);