import { useEffect, useState } from "react";

export default function RecruiterHome() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("${import.meta.env.VITE_API_URL}/api/jobs/recruiter", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setJobs(data));

    fetch("${import.meta.env.VITE_API_URL}/api/applications/recruiter", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setApplications(data));
  }, []);

  const totalApplications = applications.length;
  const shortlisted = applications.filter(a => a.status === "Shortlisted").length;
  const interviews = applications.filter(a => a.status === "Interview").length;
  const selected = applications.filter(a => a.status === "Selected").length;

  return (
    <div>
      <h2 style={{ marginBottom: "30px" }}>Recruiter Dashboard</h2>

      <div style={cardContainer}>
        <StatCard title="Total Jobs" value={jobs.length} color="#3b82f6" />
        <StatCard title="Applications" value={totalApplications} color="#6366f1" />
        <StatCard title="Shortlisted" value={shortlisted} color="#f59e0b" />
        <StatCard title="Interviews" value={interviews} color="#0ea5e9" />
        <StatCard title="Selected" value={selected} color="#10b981" />
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div style={{
      background: "white",
      padding: "25px",
      borderRadius: "10px",
      minWidth: "180px",
      borderTop: `4px solid ${color}`,
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
    }}>
      <h4 style={{ margin: 0 }}>{title}</h4>
      <h2 style={{ marginTop: "10px", color }}>{value}</h2>
    </div>
  );
}

const cardContainer = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap"
};