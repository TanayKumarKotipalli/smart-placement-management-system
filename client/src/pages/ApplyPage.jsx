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

  // ✅ ADD HERE (before return)
  const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
  const alreadyApplied = appliedJobs.includes(jobId);

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
          style={{
            ...btn,
            background: alreadyApplied ? "gray" : "#2563eb",
            cursor: alreadyApplied ? "not-allowed" : "pointer"
          }}
          disabled={alreadyApplied}
          onClick={() => {
            if (alreadyApplied) {
              alert("You have already applied for this job");
              return;
            }

            const updated = [...appliedJobs, jobId];
            localStorage.setItem("appliedJobs", JSON.stringify(updated));

            alert("Application Submitted Successfully!");

            navigate("/student");
          }}
        >
          {alreadyApplied ? "Already Applied" : "Submit Application"}
        </button>

      </div>
    </div>
  );
}

export default ApplyPage;