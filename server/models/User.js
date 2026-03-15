const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    /* ================= BASIC INFO ================= */

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "recruiter", "admin"],
      default: "student",
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    approvalStatus: {
      type: String,
      enum: ["Pending", "Approved"],
      default: "Approved", // can change to Pending if needed
    },

    /* ================= STUDENT FIELDS ================= */

    cgpa: { type: Number, default: 0 },
    backlogs: { type: Number, default: 0 },

    tenthMarks: { type: Number, default: 0 },
    interMarks: { type: Number, default: 0 },
    btechMarks: { type: Number, default: 0 },

    skills: {
      type: [String],
      default: [],
    },

    mobile: { type: String, default: "" },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },

    resumeLink: { type: String, default: "" },
    resumePath: { type: String, default: "" },

    atsScore: { type: Number, default: 0 },
    atsSuggestions: {
      type: [String],
      default: [],
    },

    /* ================= RECRUITER FIELDS ================= */

    companyName: { type: String, default: "" },
    companyWebsite: { type: String, default: "" },

    /* ================= PASSWORD RESET ================= */

    resetPasswordToken: {
      type: String,
      default: null,
    },

    resetPasswordExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

/* Prevent model overwrite error */
module.exports =
  mongoose.models.User || mongoose.model("User", userSchema);