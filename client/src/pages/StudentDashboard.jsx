import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StudentDashboard() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [atsData, setAtsData] = useState(null);

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    async function fetchProfile() {
      const res = await axios.get(
        "http://localhost:5000/api/users/profile",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStudent(res.data);
      setFormData(res.data);
    }
    fetchProfile();
  }, [token]);

  /* ================= FETCH JOBS ================= */
  useEffect(() => {
    if (activeTab === "jobs") {
      axios
        .get("http://localhost:5000/api/users/recommended", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => setRecommendedJobs(res.data));
    }
  }, [activeTab, token]);

  /* ================= FETCH APPLICATIONS ================= */
  useEffect(() => {
    if (activeTab === "applications") {
      axios
        .get("http://localhost:5000/api/applications/my", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => setApplications(res.data));
    }
  }, [activeTab, token]);

  if (!student) return <h2 style={{ padding: 40 }}>Loading...</h2>;
const questionBank = {
  DSA: [
    "Explain time complexity of binary search.",
    "What is a balanced binary tree?",
    "Implement stack using array.",
    "What is dynamic programming?",
    "Difference between BFS and DFS?",
    "Explain HashMap collision handling.",
    "Reverse a linked list.",
    "Find duplicate in array.",
    "What is greedy algorithm?",
    "Explain recursion with example."
  ],

  React: [
    "What is Virtual DOM?",
    "Explain useEffect hook.",
    "Difference between state and props?",
    "What is lifting state up?",
    "Explain React lifecycle.",
    "What is Context API?",
    "Controlled vs uncontrolled components?",
    "Explain useMemo and useCallback.",
    "What is reconciliation?",
    "Explain React Router."
  ],

  Java: [
    "What is JVM?",
    "Difference between JDK, JRE?",
    "Explain OOP principles.",
    "What is multithreading?",
    "Explain HashMap in Java.",
    "What is Exception handling?",
    "What is Spring Boot?",
    "Difference between interface and abstract class?",
    "What is garbage collection?",
    "Explain Java collections framework."
  ],

  Python: [
    "What is list comprehension?",
    "Difference between tuple and list?",
    "Explain decorators.",
    "What is GIL?",
    "What are generators?",
    "Explain lambda functions.",
    "Difference between deep and shallow copy?",
    "What is Django?",
    "Explain OOP in Python.",
    "What is virtual environment?"
  ],

  "Full Stack Developer": [
    "Explain REST APIs.",
    "What is MVC architecture?",
    "How frontend communicates with backend?",
    "What is JWT?",
    "Explain microservices.",
    "Difference between SQL and NoSQL?",
    "What is Docker?",
    "Explain CI/CD pipeline.",
    "What is load balancing?",
    "What is API rate limiting?"
  ],
  JavaScript: [
  "Explain var, let, and const differences.",
  "What is hoisting?",
  "Explain closures with example.",
  "What is event bubbling?",
  "Difference between == and ===?",
  "Explain promises in JavaScript.",
  "What is async/await?",
  "Explain arrow functions.",
  "What is event loop?",
  "What is debouncing and throttling?"
],
CSS: [
  "Explain box model.",
  "Difference between flexbox and grid?",
  "What is position: relative vs absolute?",
  "Explain z-index.",
  "What is specificity?",
  "What is media query?",
  "Difference between inline and block elements?",
  "Explain CSS transitions.",
  "What is pseudo-class?",
  "How to center a div?"
]
};
const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/");
};
function StatusBadge({ status }) {
  let style = {};
  let message = "";

  switch (status) {
    case "Applied":
      style = { background: "#2563eb" };
      message = "🔵 Applied";
      break;

    case "Shortlisted":
      style = { background: "#facc15", color: "black" };
      message = "🟡 Shortlisted";
      break;

    case "Interview":
      style = { background: "#fb923c" };
      message = "🟠 Interview Scheduled";
      break;

    case "Selected":
      style = { background: "#22c55e" };
      message = "🎉 Congrats! You are Selected";
      break;

    case "Rejected":
      style = { background: "#dc2626" };
      message = "🔴 Rejected";
      break;

    default:
      style = { background: "gray" };
      message = status;
  }

  return (
    <div style={{
      marginTop: "10px",
      padding: "8px 14px",
      borderRadius: "6px",
      fontWeight: "bold",
      color: "white",
      display: "inline-block",
      ...style
    }}>
      {message}
    </div>
  );
}

  return (
  <div style={layout}>

    {/* SIDEBAR */}
    <div style={sidebar}>
      <div>
        <h2>🎓 Student</h2>

        <div style={menuItem} onClick={() => setActiveTab("dashboard")}>Dashboard</div>
        <div style={menuItem} onClick={() => setActiveTab("jobs")}>Recommended Jobs</div>
        <div style={menuItem} onClick={() => setActiveTab("applications")}>My Applications</div>
        <div style={menuItem} onClick={() => setActiveTab("resume")}>Resume & ATS</div>
        <div style={menuItem} onClick={() => setActiveTab("interview")}>Interview Prep</div>
      </div>

      <div
        style={{
          padding: "12px",
          background: "#dc2626",
          borderRadius: "6px",
          cursor: "pointer",
          textAlign: "center"
        }}
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
      >
        Logout
      </div>
    </div>

    {/* MAIN CONTENT */}
    <div style={main}>

        <h1 style={{ marginBottom: 20 }}>{activeTab.toUpperCase()}</h1>
        

        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <>
            <button style={primaryBtn} onClick={() => setIsModalOpen(true)}>
              Edit Profile
            </button>

            <div style={grid}>
              <Card title="👤 Personal Info">
                <p><b>Name:</b> {student.name}</p>
                <p><b>Email:</b> {student.email}</p>
                <p><b>Mobile:</b> {student.mobile || "-"}</p>
              </Card>

              <Card title="🎓 Academics">
                <p><b>CGPA:</b> {student.cgpa}</p>
                <p><b>Backlogs:</b> {student.backlogs}</p>
                <p><b>10th %:</b> {student.tenthMarks || "-"}</p>
                <p><b>Inter %:</b> {student.interMarks || "-"}</p>
                <p><b>B.Tech %:</b> {student.btechMarks || "-"}</p>
              </Card>

              <Card title="💻 Skills">
                {student.skills?.length > 0
                  ? student.skills.map((s, i) => (
                      <span key={i} style={badge}>{s}</span>
                    ))
                  : "No skills added"}
              </Card>

              <Card title="🌐 Social">
                <p><b>GitHub:</b> {student.github || "-"}</p>
                <p><b>LinkedIn:</b> {student.linkedin || "-"}</p>
              </Card>
            </div>
          </>
        )}

        {/* JOBS */}
        {activeTab === "jobs" && (
  recommendedJobs.length === 0 ? (
    <p>No relevant jobs found.</p>
  ) : (
    recommendedJobs.map((job) => (
      <Card key={job._id} title={job.title}>

        <p><strong>Company:</strong> {job.company}</p>
        <p><strong>Job Type:</strong> {job.jobType || "N/A"}</p>
        <p><strong>Salary / Stipend:</strong> {job.salary || "Not disclosed"}</p>
        <p><strong>Location:</strong> {job.location || "Not specified"}</p>
        <p><strong>Minimum CGPA:</strong> {job.minCGPA}</p>
        <p><strong>Max Backlogs:</strong> {job.maxBacklogs}</p>

        {job.branches && job.branches.length > 0 && (
          <p><strong>Eligible Branches:</strong> {job.branches.join(", ")}</p>
        )}

        <p><strong>Skills Required:</strong> {job.skillsRequired.join(", ")}</p>

        <p>
          <strong>Deadline:</strong>{" "}
          {job.deadline
            ? new Date(job.deadline).toLocaleDateString()
            : "N/A"}
        </p>

        <p><strong>Description:</strong></p>
        <p style={{ marginBottom: "10px" }}>{job.description}</p>

        <p style={{ color: "#2563eb", fontWeight: "bold" }}>
          Compatibility: {job.compatibility}%
        </p>

        <button
          style={primaryBtn}
          onClick={async () => {
            await axios.post(
              `http://localhost:5000/api/applications/apply/${job._id}`,
              {},
              { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Applied successfully");
          }}
        >
          Apply
        </button>

      </Card>
    ))
  )
)}

        {/* APPLICATIONS */}
    {activeTab === "applications" && (
  applications.length === 0 ? (
    <p>No applications yet.</p>
  ) : (
    applications.map((app) => (
      <Card key={app._id} title={app.job.title}>

        <p><strong>Company:</strong> {app.job.company}</p>
        <p><strong>Job Type:</strong> {app.job.jobType || "N/A"}</p>
        <p><strong>Salary / Stipend:</strong> {app.job.salary || "Not disclosed"}</p>
        <p><strong>Location:</strong> {app.job.location || "Not specified"}</p>
        <p><strong>Minimum CGPA:</strong> {app.job.minCGPA}</p>
        <p><strong>Max Backlogs:</strong> {app.job.maxBacklogs}</p>

        {app.job.branches && app.job.branches.length > 0 && (
          <p><strong>Eligible Branches:</strong> {app.job.branches.join(", ")}</p>
        )}

        <p><strong>Skills Required:</strong> {app.job.skillsRequired.join(", ")}</p>

        <p>
          <strong>Deadline:</strong>{" "}
          {app.job.deadline
            ? new Date(app.job.deadline).toLocaleDateString()
            : "N/A"}
        </p>

        <p><strong>Description:</strong></p>
        <p style={{ marginBottom: "10px" }}>
          {app.job.description}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          <span
            style={{
              color:
                app.status === "Applied"
                  ? "blue"
                  : app.status === "Shortlisted"
                  ? "goldenrod"
                  : app.status === "Interview"
                  ? "orange"
                  : app.status === "Selected"
                  ? "green"
                  : "red",
              fontWeight: "bold",
            }}
          >
            {app.status}
          </span>
        </p>

        <p>
          <strong>Applied On:</strong>{" "}
          {new Date(app.createdAt).toLocaleDateString()}
        </p>

      </Card>
    ))
  )
)}
        {/* RESUME */}
        {activeTab === "resume" && (
          <>
            <Card title="📄 Upload Resume (PDF Only)">
              {student.resumePath ? (
                <p style={{ color: "green" }}>Resume uploaded ✔</p>
              ) : (
                <p style={{ color: "red" }}>No resume uploaded</p>
              )}

              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />

              <button
                style={primaryBtn}
                onClick={async () => {
                  if (!selectedFile) return alert("Select PDF first");

                  const data = new FormData();
                  data.append("resume", selectedFile);

                  await axios.post(
                    "http://localhost:5000/api/users/resume/upload",
                    data,
                    { headers: { Authorization: `Bearer ${token}` } }
                  );

                  const updated = await axios.get(
                    "http://localhost:5000/api/users/profile",
                    { headers: { Authorization: `Bearer ${token}` } }
                  );

                  setStudent(updated.data);
                  alert("Resume uploaded");
                }}
              >
                Upload
              </button>
            </Card>

            <Card title="📊 ATS Score">
              <button
                style={primaryBtn}
                onClick={async () => {
                  const res = await axios.get(
                    "http://localhost:5000/api/users/ats",
                    { headers: { Authorization: `Bearer ${token}` } }
                  );
                  setAtsData(res.data);
                }}
              >
                Generate ATS Score
              </button>

              {atsData && (
                <>
                  <h2 style={{ color: "#2563eb" }}>{atsData.score}%</h2>
                  <ul>
                    {atsData.suggestions.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </>
              )}
            </Card>
          </>
        )}

      {/* INTERVIEW */}
{activeTab === "interview" && (
  <div>
    {applications.length === 0 ? (
      <p>Apply for jobs to unlock interview preparation.</p>
    ) : (
      (() => {
        const skillsFromJobs = new Set();

        applications.forEach(app => {
          if (app.job && app.job.skillsRequired) {
            app.job.skillsRequired.forEach(skill => {
              skillsFromJobs.add(skill.toLowerCase());
            });
          }
        });

        const normalizedQuestionBank = {};
        Object.keys(questionBank).forEach(key => {
          normalizedQuestionBank[key.toLowerCase()] = questionBank[key];
        });

        const matchedSkills = [...skillsFromJobs].filter(
          skill => normalizedQuestionBank[skill]
        );

        if (matchedSkills.length === 0) {
          return (
            <p>
              No interview questions available for your applied job skills yet.
            </p>
          );
        }

        return matchedSkills.map(skill => (
          <div key={skill} style={card}>
            <h3 style={{ marginBottom: "15px" }}>
              {skill.toUpperCase()} Interview Questions
            </h3>

            <ol>
              {normalizedQuestionBank[skill].map((question, index) => (
                <li key={index} style={{ marginBottom: "10px" }}>
                  {question}
                </li>
              ))}
            </ol>
          </div>
        ));
      })()
    )}
  </div>
)}


      </div>
      


      {/* EDIT MODAL */}
      {isModalOpen && (
        <div style={modalOverlay}>
          <div style={modal}>
            <h2>Edit Profile</h2>

            {[
              "name", "email", "mobile",
              "cgpa", "backlogs",
              "tenthMarks", "interMarks", "btechMarks",
              "github", "linkedin"
            ].map(field => (
              <input
                key={field}
                placeholder={field}
                value={formData[field] || ""}
                onChange={(e) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
              />
            ))}

            <input
              placeholder="Skills (comma separated)"
              value={formData.skills?.join(", ") || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  skills: e.target.value.split(",").map(s => s.trim())
                })
              }
            />

            <button
              style={primaryBtn}
              onClick={async () => {
                const res = await axios.put(
                  "http://localhost:5000/api/users/profile",
                  formData,
                  { headers: { Authorization: `Bearer ${token}` } }
                );
                setStudent(res.data);
                setIsModalOpen(false);
              }}
            >
              Save
            </button>

            <button style={dangerBtn} onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );

  /* ========== SMALL COMPONENTS ========== */

  function Card({ title, children }) {
    return (
      <div style={card}>
        <h3>{title}</h3>
        {children}
      </div>
    );
  }
}

export default StudentDashboard;

/* ================= STYLES ================= */

const layout = { display: "flex", minHeight: "100vh", fontFamily: "Segoe UI" };
const sidebar = {
  width: 220,
  background: "#1e293b",
  color: "white",
  padding: 20,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
};
const menuItem = { margin: "15px 0", cursor: "pointer" };
const main = { flex: 1, padding: 40, background: "#f4f6f9" };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 20 };
const card = { background: "white", padding: 20, borderRadius: 10, boxShadow: "0 4px 10px rgba(0,0,0,0.05)", marginBottom: 20 };
const badge = { display: "inline-block", background: "#2563eb", color: "white", padding: "5px 10px", borderRadius: 20, margin: 5 };
const primaryBtn = { padding: "8px 16px", background: "#2563eb", color: "white", border: "none", borderRadius: 6, cursor: "pointer", marginTop: 10 };
const dangerBtn = { padding: "8px 16px", background: "#dc2626", color: "white", border: "none", borderRadius: 6, cursor: "pointer", marginTop: 10 };
const modalOverlay = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" };
const modal = { background: "white", padding: 30, borderRadius: 10, width: 450, display: "flex", flexDirection: "column", gap: 10 };
