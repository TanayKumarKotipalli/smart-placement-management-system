import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function ApplyPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    coverLetter: ""
  });

  return (
    <div style={wrapper}>
      <div style={card}>
        <h2>Apply for Job</h2>

        <p><b>Job ID:</b> {jobId}</p>

        <input
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e) =>
            setForm({ ...form, fullName: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <textarea
          placeholder="Cover Letter"
          rows="5"
          value={form.coverLetter}
          onChange={(e) =>
            setForm({ ...form, coverLetter: e.target.value })
          }
        />

        <button
          style={btn}
          onClick={() => {
            alert("Application Submitted Successfully!");
            navigate("/student");
          }}
        >
          Submit Application
        </button>
      </div>
    </div>
  );
}

export default ApplyPage;

/* ===== Styles ===== */

const wrapper = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f4f6f9"
};

const card = {
  background: "white",
  padding: 40,
  borderRadius: 10,
  width: 400,
  display: "flex",
  flexDirection: "column",
  gap: 15,
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
};

const btn = {
  padding: "10px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: 6,
  cursor: "pointer"
};
