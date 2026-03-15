import { useEffect, useState } from "react";

export default function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs/recruiter", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setJobs(data));
  }, []);

  return (
    <div>
      <h2>My Jobs</h2>

      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        jobs.map(job => (
          <div key={job._id} style={card}>
            <h3>{job.title}</h3>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Min CGPA:</strong> {job.minCGPA}</p>
            <p><strong>Skills:</strong> {job.skillsRequired.join(", ")}</p>
          </div>
        ))
      )}
    </div>
  );
}

const card = {
  background: "white",
  padding: "15px",
  marginBottom: "10px",
  borderRadius: "6px",
};