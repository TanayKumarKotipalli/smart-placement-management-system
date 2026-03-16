import { useEffect, useState } from "react";

export default function MatchedCandidates() {
  const [applications, setApplications] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("${import.meta.env.VITE_API_URL}/api/applications/recruiter", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(app => app.status === "Applied");
        setApplications(filtered);
      });
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/applications/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    window.location.reload();
  };

  return (
    <div>
      <h2>Matched Applicants</h2>

      {applications.map(app => (
        <div key={app._id} style={card}>
          <h3>{app.student.name}</h3>
          <p><strong>Job:</strong> {app.job.title}</p>
          <p><strong>Compatibility:</strong> {app.compatibilityScore}%</p>

          <button onClick={() => updateStatus(app._id, "Shortlisted")}>
            Shortlist
          </button>
          <button onClick={() => updateStatus(app._id, "Rejected")}>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}

const card = {
  background: "white",
  padding: "15px",
  marginBottom: "10px",
  borderRadius: "6px",
};