import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PostJob() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    skillsRequired: "",
    branches: "",
    minCGPA: "",
    maxBacklogs: "",
    salary: "",
    location: "",
    jobType: "Full-time",
    deadline: "",
    applyLink: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          skillsRequired: formData.skillsRequired
            .split(",")
            .map(s => s.trim()),
          branches: formData.branches
            ? formData.branches.split(",").map(b => b.trim())
            : []
        })
      });

      if (!res.ok) {
        throw new Error("Failed to create job");
      }

      alert("Job Posted Successfully!");
      navigate("/recruiter");

    } catch (err) {
      console.error(err);
      alert("Error creating job");
    }
  };

  return (
    <div style={container}>
      <h2 style={{ marginBottom: "30px" }}>Post New Job</h2>

      <form onSubmit={handleSubmit} style={form}>

        <div style={row}>
          <input name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} required />
          <input name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} required />
        </div>

        <div style={row}>
          <input name="minCGPA" type="number" placeholder="Minimum CGPA" value={formData.minCGPA} onChange={handleChange} />
          <input name="maxBacklogs" type="number" placeholder="Max Backlogs" value={formData.maxBacklogs} onChange={handleChange} />
        </div>

        <div style={row}>
          <input name="salary" placeholder="Salary / CTC" value={formData.salary} onChange={handleChange} />
          <input name="location" placeholder="Job Location" value={formData.location} onChange={handleChange} />
        </div>

        <div style={row}>
          <select name="jobType" value={formData.jobType} onChange={handleChange}>
            <option value="Full-time">Full-time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </select>

          <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} />
        </div>

        <input
          name="branches"
          placeholder="Eligible Branches (comma separated)"
          value={formData.branches}
          onChange={handleChange}
        />

        <input
          name="skillsRequired"
          placeholder="Required Skills (comma separated)"
          value={formData.skillsRequired}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          rows="5"
          required
        />

        <input
          name="applyLink"
          placeholder="Apply Link"
          value={formData.applyLink}
          onChange={handleChange}
        />

        <div style={buttonRow}>
          <button type="submit" style={primaryBtn}>
            Publish Job
          </button>

          <button
            type="button"
            style={secondaryBtn}
            onClick={() => navigate("/recruiter")}
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  background: "white",
  padding: "40px",
  borderRadius: "12px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  maxWidth: "950px"
};

const form = {
  display: "flex",
  flexDirection: "column",
  gap: "20px"
};

const row = {
  display: "flex",
  gap: "20px"
};

const buttonRow = {
  display: "flex",
  gap: "15px",
  marginTop: "20px"
};

const primaryBtn = {
  padding: "12px 24px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600"
};

const secondaryBtn = {
  padding: "12px 24px",
  background: "#e5e7eb",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "500"
};