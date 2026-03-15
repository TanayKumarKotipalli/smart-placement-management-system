import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [activeTab, setActiveTab] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(res.data);
  };

  // ================= FETCH JOBS =================
  const fetchJobs = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/jobs", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setJobs(res.data);
  };

  useEffect(() => {
    if (activeTab === "users") fetchUsers();
    if (activeTab === "jobs") fetchJobs();
  }, [activeTab]);

  const handleBlock = async (userId) => {
    await axios.put(
      `http://localhost:5000/api/admin/block/${userId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchUsers();
  };

  const handleDeleteJob = async (jobId) => {
    await axios.delete(
      `http://localhost:5000/api/admin/delete-job/${jobId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchJobs();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const totalStudents = users.filter(u => u.role === "student").length;
  const totalRecruiters = users.filter(u => u.role === "recruiter").length;
  const totalAdmins = users.filter(u => u.role === "admin").length;

  return (
    <div style={layout}>
      
      {/* SIDEBAR */}
      <div style={sidebar}>
        <div>
          <h2>⚙ Admin Panel</h2>

          <div style={menuItem} onClick={() => setActiveTab("dashboard")}>
            Dashboard
          </div>

          <div style={menuItem} onClick={() => setActiveTab("users")}>
            Manage Users
          </div>

          <div style={menuItem} onClick={() => setActiveTab("jobs")}>
            Manage Jobs
          </div>
        </div>

        <div style={logoutBtn} onClick={handleLogout}>
          Logout
        </div>
      </div>

      {/* MAIN */}
      <div style={main}>
        <h1>{activeTab.toUpperCase()}</h1>

        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <div style={grid}>
            <StatCard title="Total Users" value={users.length} color="#2563eb" />
            <StatCard title="Students" value={totalStudents} color="#10b981" />
            <StatCard title="Recruiters" value={totalRecruiters} color="#f59e0b" />
            <StatCard title="Admins" value={totalAdmins} color="#8b5cf6" />
            <StatCard title="Total Jobs" value={jobs.length} color="#ef4444" />
          </div>
        )}

        {/* USERS */}
        {activeTab === "users" && (
          <div>
            {users.map(user => (
              <div key={user._id} style={card}>
                <div>
                  <b>{user.name}</b> ({user.role})
                  <br />
                  {user.email}
                </div>

                {user.role !== "admin" && (
                  <button
                    style={{
                      ...primaryBtn,
                      background: user.isBlocked ? "#10b981" : "#dc2626"
                    }}
                    onClick={() => handleBlock(user._id)}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* JOBS */}
        {activeTab === "jobs" && (
          <div>
            {jobs.map(job => (
              <div key={job._id} style={card}>
                <div>
                  <b>{job.title}</b>
                  <br />
                  {job.company}
                </div>

                <button
                  style={{ ...primaryBtn, background: "#dc2626" }}
                  onClick={() => handleDeleteJob(job._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div style={{ ...statCard, borderTop: `4px solid ${color}` }}>
      <h3>{title}</h3>
      <h2 style={{ color }}>{value}</h2>
    </div>
  );
}

export default AdminDashboard;


/* ================= STYLES ================= */

const layout = { display: "flex", minHeight: "100vh", fontFamily: "Segoe UI" };

const sidebar = {
  width: 240,
  background: "#1e293b",
  color: "white",
  padding: 20,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
};

const menuItem = {
  margin: "15px 0",
  cursor: "pointer"
};

const logoutBtn = {
  padding: "12px",
  background: "#dc2626",
  borderRadius: 6,
  textAlign: "center",
  cursor: "pointer"
};

const main = {
  flex: 1,
  padding: 40,
  background: "#f4f6f9"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: 20
};

const statCard = {
  background: "white",
  padding: 20,
  borderRadius: 10,
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
};

const card = {
  background: "white",
  padding: 20,
  borderRadius: 10,
  marginBottom: 15,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
};

const primaryBtn = {
  padding: "8px 16px",
  border: "none",
  borderRadius: 6,
  color: "white",
  cursor: "pointer"
};