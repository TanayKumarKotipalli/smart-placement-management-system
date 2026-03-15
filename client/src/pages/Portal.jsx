import { useNavigate } from "react-router-dom";
import "./Portal.css";

function Portal() {
  const navigate = useNavigate();

  return (
    <div className="portal-wrapper">

      {/* ===== HERO SECTION ===== */}
      <div className="hero">
        <div className="hero-badge">🚀 Placement Intelligence Platform</div>

        <h1 className="hero-title">
          Smart Placement <span>Management System</span>
        </h1>

        <p className="hero-subtitle">
          Connecting students, recruiters, and administrators through one
          intelligent placement ecosystem.
        </p>
      </div>

      {/* ===== STATS SECTION ===== */}
      <div className="stats">
        <div className="stat-card">
          <div className="stat-number">2450+</div>
          <div className="stat-label">Students Registered</div>
          <div className="stat-growth">+12% this year</div>
        </div>

        <div className="stat-card">
          <div className="stat-number">180+</div>
          <div className="stat-label">Companies Hiring</div>
          <div className="stat-growth">+8% growth</div>
        </div>

        <div className="stat-card">
          <div className="stat-number">92%</div>
          <div className="stat-label">Placement Success Rate</div>
          <div className="stat-growth">Top Performing Colleges</div>
        </div>
      </div>

      {/* ===== PORTAL SECTION ===== */}
      <div className="portal-section">
        <h2 className="portal-heading">Choose Your Portal</h2>
        <p className="portal-subheading">
          Access your dedicated dashboard based on your role
        </p>

        <div className="portal-cards">

          {/* STUDENT */}
          <div className="portal-card">
            <div className="portal-icon blue">🎓</div>

            <h3>Student Portal</h3>
            <p>Track opportunities and manage your placement journey.</p>

            <ul>
              <li>View recommended jobs</li>
              <li>Track applications</li>
              <li>ATS Score Analysis</li>
              <li>Interview Preparation</li>
            </ul>

<button
  className="portal-btn blue-btn"
  onClick={() => navigate("/login?role=student")}
>
  Login as Student
</button>

<button
  className="portal-btn"
  style={{ marginTop: "10px", background: "#1e293b" }}
  onClick={() => navigate("/register/student")}
>
  Register as Student
</button>
          </div>

          {/* RECRUITER */}
          <div className="portal-card">
            <div className="portal-icon green">🏢</div>

            <h3>Recruiter Portal</h3>
            <p>Find and hire the best talent efficiently.</p>

            <ul>
              <li>Post new jobs</li>
              <li>Filter candidates</li>
              <li>Manage hiring pipeline</li>
              <li>Track shortlisted applicants</li>
            </ul>

           <button
  className="portal-btn green-btn"
  onClick={() => navigate("/login?role=recruiter")}
>
  Login as Recruiter
</button>

<button
  className="portal-btn"
  style={{ marginTop: "10px", background: "#1e293b" }}
  onClick={() => navigate("/register/recruiter")}
>
  Register as Recruiter
</button>

          </div>

          {/* ADMIN */}
          <div className="portal-card">
            <div className="portal-icon purple">🛠</div>

            <h3>Admin Portal</h3>
            <p>Monitor and control the placement ecosystem.</p>

            <ul>
              <li>View analytics dashboard</li>
              <li>Manage users</li>
              <li>Placement statistics</li>
              <li>System monitoring</li>
            </ul>

            <button
  className="portal-btn purple-btn"
  onClick={() => navigate("/login?role=admin")}
>
  Login as Admin
</button>

<button
  className="portal-btn"
  style={{ marginTop: "10px", background: "#1e293b" }}
  onClick={() => navigate("/register/admin")}
>
  Register as Admin
</button>

          </div>

        </div>
      </div>

    </div>
  );
}

export default Portal;
