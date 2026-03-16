import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password/${token}`,
        { password }
      );

      alert("Password reset successful");
      navigate("/login");

    } catch (err) {
      alert("Invalid or expired token");
    }
  };

  return (
    <div style={container}>
      <h2>Reset Password</h2>

      <form onSubmit={handleSubmit} style={form}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" style={button}>
          Reset Password
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
  background: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};