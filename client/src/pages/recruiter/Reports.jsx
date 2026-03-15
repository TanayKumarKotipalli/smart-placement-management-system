import { useEffect, useState } from "react";

export default function Reports() {
  const [applications, setApplications] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/applications/recruiter", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setApplications(data));
  }, []);

  const total = applications.length;
  const shortlisted = applications.filter(a => a.status === "Shortlisted").length;
  const interviews = applications.filter(a => a.status === "Interview").length;
  const selected = applications.filter(a => a.status === "Selected").length;

  return (
    <div>
      <h2>Reports</h2>
      <p>Total Applications: {total}</p>
      <p>Shortlisted: {shortlisted}</p>
      <p>Interviews: {interviews}</p>
      <p>Selected: {selected}</p>
    </div>
  );
}