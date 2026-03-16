import { useEffect, useState } from "react";

export default function Interviews() {
  const [applications, setApplications] = useState([]);
  const token = localStorage.getItem("token");

  // Proper reusable fetch function
  const fetchApplications = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/applications/recruiter`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();

      // Only show Interview status
      const filtered = data.filter(
        (app) => app.status === "Interview"
      );

      setApplications(filtered);
    } catch (err) {
      console.error("Error fetching interviews:", err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Unified status update function
 const updateStatus = async (id, status) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/applications/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    if (!res.ok) {
      throw new Error("Update failed");
    }

    // 🔥 Remove candidate from local state immediately
    setApplications(prev =>
      prev.filter(app => app._id !== id)
    );

    alert(`Candidate ${status}`);
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Interviews</h2>

      {applications.length === 0 ? (
        <p>No interviews scheduled.</p>
      ) : (
        applications.map((app) => (
          <div key={app._id} style={card}>
            <h3>{app.student?.name}</h3>
            <p><strong>Job:</strong> {app.job?.title}</p>

            <div style={buttonRow}>
              <button
                style={selectBtn}
                onClick={() => updateStatus(app._id, "Selected")}
              >
                Select
              </button>

              <button
                style={rejectBtn}
                onClick={() => updateStatus(app._id, "Rejected")}
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const card = {
  background: "white",
  padding: "20px",
  marginBottom: "15px",
  borderRadius: "8px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
};

const buttonRow = {
  display: "flex",
  gap: "10px",
  marginTop: "10px",
};

const selectBtn = {
  padding: "8px 16px",
  background: "#22c55e",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const rejectBtn = {
  padding: "8px 16px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};