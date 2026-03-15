import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData
      );

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      // 🔥 Role-based navigation
      switch (user.role) {
        case "student":
          navigate("/student");
          break;
        case "recruiter":
          navigate("/recruiter");
          break;
        case "admin":
          navigate("/admin");
          break;
        default:
          alert("Unknown user role");
      }

    } catch (err) {
      if (err.response?.status === 403) {
        alert("Your account has been blocked by admin.");
      } else {
        alert("Invalid credentials");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      {/* LEFT SIDE */}
      <div className="login-left">
        <div className="brand">
          <h1>Smart Placement</h1>
          <p>
            A unified ecosystem connecting students,
            recruiters, and institutions intelligently.
          </p>
        </div>

        <div className="features">
          <div>✔ Intelligent Job Matching</div>
          <div>✔ ATS Score Optimization</div>
          <div>✔ Application Tracking</div>
          <div>✔ Recruiter Analytics</div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <div className="login-card">
          <h2>Welcome Back</h2>
          <p className="subtitle">Login to your account</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <p
  style={{ cursor: "pointer", color: "#2563eb", marginTop: "8px" }}
  onClick={() => navigate("/forgot-password")}
>
  Forgot Password?
</p>

            <button type="submit" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="login-footer">
            <p>© 2026 Smart Placement Management System</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;