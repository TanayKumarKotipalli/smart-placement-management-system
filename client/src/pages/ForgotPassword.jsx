import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {
        email,
      });

      alert("If email exists, reset link sent.");
      navigate("/login");

    } catch (err) {
      alert("Error sending reset link");
    }
  };

  return (
    <div style={container}>
      <h2>Forgot Password</h2>

      <form onSubmit={handleSubmit} style={form}>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" style={button}>
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f4f6f9",
};

const form = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  width: "300px",
};

const button = {
  padding: "10px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};