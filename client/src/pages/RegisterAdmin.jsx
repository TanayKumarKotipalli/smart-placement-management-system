import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterAdmin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    adminKey: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Optional security: basic admin key validation
    if (form.adminKey !== "SPMS-ADMIN-2026") {
      alert("Invalid Admin Key");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: "admin",
      });

      alert("Admin Registered Successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={wrapper}>
      <div style={card}>
        <h2>🛠 Admin Registration</h2>

        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Admin Email"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <input
            name="adminKey"
            placeholder="Enter Admin Access Key"
            onChange={handleChange}
            required
          />

          <button type="submit">Register as Admin</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterAdmin;

/* ===== STYLES ===== */

const wrapper = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f4f6f9",
};

const card = {
  width: "420px",
  background: "white",
  padding: "40px",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};
