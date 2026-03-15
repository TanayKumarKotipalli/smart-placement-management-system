import { useState, useEffect } from "react";

export default function RecruiterDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch recruiter jobs
  const fetchJobs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/jobs/recruiter", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <>
            <div style={cardContainer}>
              <Card title="Total Jobs Posted" value={jobs.length} color="#3b82f6" />
            </div>
          </>
        );

      case "post-job":
        return <PostJobForm refreshJobs={fetchJobs} />;

      case "my-jobs":
  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>My Jobs</h2>

      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} style={jobCard}>

            <div style={jobHeader}>
              <h3>{job.title}</h3>
              <span style={statusBadge}>{job.status || "Active"}</span>
            </div>

            <div style={jobGrid}>

              <p><b>Company:</b> {job.company}</p>
              <p><b>Job Type:</b> {job.jobType}</p>
              <p><b>Salary:</b> {job.salary}</p>
              <p><b>Location:</b> {job.location}</p>

              <p><b>Min CGPA:</b> {job.minCGPA}</p>
              <p><b>Max Backlogs:</b> {job.maxBacklogs}</p>

              <p>
                <b>Branches:</b>{" "}
                {job.branches && job.branches.length > 0
                  ? job.branches.join(", ")
                  : "All"}
              </p>

              <p>
                <b>Skills:</b>{" "}
                {job.skillsRequired?.join(", ")}
              </p>

              <p>
                <b>Deadline:</b>{" "}
                {job.deadline
                  ? new Date(job.deadline).toLocaleDateString()
                  : "Not specified"}
              </p>

            </div>

            <div style={{ marginTop: 15 }}>
              <b>Description:</b>
              <p style={{ marginTop: 5 }}>{job.description}</p>
            </div>

          </div>
        ))
      )}
    </div>
  );

      default:
        return <h2>Coming Soon</h2>;
    }
  };

  return (
    <div style={layout}>
      {/* Sidebar */}
      <div style={sidebar}>
        <h2 style={{ marginBottom: "30px" }}>Recruiter Dashboard</h2>

        <SidebarItem label="Dashboard" active={activePage === "dashboard"} onClick={() => setActivePage("dashboard")} />
        <SidebarItem label="Post Job" active={activePage === "post-job"} onClick={() => setActivePage("post-job")} />
        <SidebarItem label="My Jobs" active={activePage === "my-jobs"} onClick={() => setActivePage("my-jobs")} />
      </div>

      {/* Main */}
      <div style={main}>
        {renderContent()}
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function SidebarItem({ label, onClick, active }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "10px",
        marginBottom: "10px",
        cursor: "pointer",
        borderRadius: "6px",
        background: active ? "#334155" : "transparent",
      }}
    >
      {label}
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        minWidth: "200px",
        borderTop: `4px solid ${color}`,
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
      }}
    >
      <h4>{title}</h4>
      <h2 style={{ color }}>{value}</h2>
    </div>
  );
}

function PostJobForm({ refreshJobs }) {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    company: "",
    description: "",
    skillsRequired: "",
    branches: "",
    minCGPA: "",
    maxBacklogs: "",
    salary: "",
    jobType: "Full-time",
    location: "",
    deadline: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:5000/api/jobs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          skillsRequired: form.skillsRequired
            .split(",")
            .map((s) => s.trim()),
          branches: form.branches
            ? form.branches.split(",").map((b) => b.trim())
            : [],
        }),
      });

      alert("Job posted successfully");

      setForm({
        title: "",
        company: "",
        description: "",
        skillsRequired: "",
        branches: "",
        minCGPA: "",
        maxBacklogs: "",
        salary: "",
        jobType: "Full-time",
        location: "",
        deadline: "",
      });

      if (refreshJobs) refreshJobs();

    } catch (err) {
      alert("Failed to post job");
    }
  };

  return (
    <div style={formCard}>
      <h2 style={{ marginBottom: 25 }}>Post New Job</h2>

      <form onSubmit={handleSubmit} style={formGrid}>

        <input name="title" placeholder="Job Title" value={form.title} onChange={handleChange} required />
        <input name="company" placeholder="Company Name" value={form.company} onChange={handleChange} required />

        <input name="minCGPA" type="number" placeholder="Minimum CGPA" value={form.minCGPA} onChange={handleChange} />
        <input name="maxBacklogs" type="number" placeholder="Max Backlogs" value={form.maxBacklogs} onChange={handleChange} />

        <input name="salary" placeholder="Salary / CTC" value={form.salary} onChange={handleChange} />
        <input name="location" placeholder="Job Location" value={form.location} onChange={handleChange} />

        <select name="jobType" value={form.jobType} onChange={handleChange}>
          <option value="Full-time">Full-time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>

        <input name="branches" placeholder="Eligible Branches (comma separated)" value={form.branches} onChange={handleChange} />

        <input name="skillsRequired" placeholder="Required Skills (comma separated)" value={form.skillsRequired} onChange={handleChange} required />

        <input type="date" name="deadline" value={form.deadline} onChange={handleChange} />

        <textarea
          name="description"
          placeholder="Job Description"
          value={form.description}
          onChange={handleChange}
          required
          style={{ gridColumn: "1 / -1", minHeight: 120 }}
        />

        <div style={{ gridColumn: "1 / -1", display: "flex", gap: 15 }}>
          <button type="submit" style={primaryBtn}>
            Publish Job
          </button>
          <button type="button" style={cancelBtn} onClick={() => setForm({
            title: "",
            company: "",
            description: "",
            skillsRequired: "",
            branches: "",
            minCGPA: "",
            maxBacklogs: "",
            salary: "",
            jobType: "Full-time",
            location: "",
            deadline: "",
          })}>
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
}
/* ================= STYLES ================= */

const layout = {
  display: "flex",
  height: "100vh",
  fontFamily: "Arial",
};

const sidebar = {
  width: "240px",
  background: "#1e293b",
  color: "white",
  padding: "20px",
};

const main = {
  flex: 1,
  background: "#f1f5f9",
  padding: "30px",
};

const cardContainer = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
};

const jobCard = {
  background: "white",
  padding: "20px",
  borderRadius: "8px",
  marginBottom: "15px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};
const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  maxWidth: "500px"
};

const buttonStyle = {
  padding: "10px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};
const jobHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 15,
};

const statusBadge = {
  background: "#10b981",
  color: "white",
  padding: "5px 10px",
  borderRadius: "20px",
  fontSize: "12px",
};

const jobGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "10px",
};