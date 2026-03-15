import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function RecruiterLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={layout}>
      <div style={sidebar}>
        <h2 style={{ marginBottom: "40px" }}>Recruiter</h2>

        <SidebarLink to="/recruiter" label="Dashboard" />
        <SidebarLink to="/recruiter/post-job" label="Post Job" />
        <SidebarLink to="/recruiter/my-jobs" label="My Jobs" />
        <SidebarLink to="/recruiter/matched" label="Matched" />
        <SidebarLink to="/recruiter/shortlisted" label="Shortlisted" />
        <SidebarLink to="/recruiter/interviews" label="Interviews" />
        <SidebarLink to="/recruiter/reports" label="Reports" />

        <button onClick={handleLogout} style={logoutButton}>
          Logout
        </button>
      </div>

      <div style={main}>
        <Outlet />
      </div>
    </div>
  );
}

function SidebarLink({ to, label }) {
  return (
    <NavLink
      to={to}
      end
      style={({ isActive }) => ({
        display: "block",
        padding: "12px 15px",
        marginBottom: "10px",
        borderRadius: "8px",
        textDecoration: "none",
        fontWeight: "500",
        background: isActive ? "#334155" : "transparent",
        color: "white",
        transition: "0.2s"
      })}
    >
      {label}
    </NavLink>
  );
}

const layout = {
  display: "flex",
  height: "100vh",
  fontFamily: "Arial"
};

const sidebar = {
  width: "240px",
  background: "#1e293b",
  color: "white",
  padding: "30px 20px",
  display: "flex",
  flexDirection: "column"
};

const main = {
  flex: 1,
  background: "#f1f5f9",
  padding: "40px",
  overflowY: "auto"
};

const logoutButton = {
  marginTop: "auto",
  padding: "12px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold"
};