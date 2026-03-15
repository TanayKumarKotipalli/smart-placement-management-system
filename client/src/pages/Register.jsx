import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    cgpa: "",
    backlogs: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Student Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="cgpa"
            placeholder="CGPA"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="backlogs"
            placeholder="Backlogs"
            onChange={handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>

        <p className="login-link">
          Already have an account?
          <span onClick={() => navigate("/login")}> Login</span>
        </p>
      </div>
    </div>
  );
}
