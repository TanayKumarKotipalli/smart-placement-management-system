import { useEffect, useState } from "react";

export default function Shortlisted() {
  const [applications, setApplications] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/applications/recruiter", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(app => app.status === "Shortlisted");
        setApplications(filtered);
      });
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/applications/update/${id}`, {
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
      <h2>Shortlisted Candidates</h2>

      {applications.map(app => (
        <div key={app._id} style={card}>
          <h3>{app.student.name}</h3>
          <p><strong>Job:</strong> {app.job.title}</p>

          <button onClick={() => updateStatus(app._id, "Interview")}>
            Schedule Interview
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