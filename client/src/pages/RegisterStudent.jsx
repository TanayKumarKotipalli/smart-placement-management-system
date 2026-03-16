import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterStudent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    cgpa: "",
    backlogs: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("${import.meta.env.VITE_API_URL}/api/auth/register", {
        ...form,
        role: "student"
      });

      alert("Student Registered Successfully");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div style={wrapper}>
      <div style={card}>
        <h2>🎓 Student Registration</h2>

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Full Name" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <input name="mobile" placeholder="Mobile Number" onChange={handleChange} />
          <input name="cgpa" type="number" placeholder="CGPA" onChange={handleChange} />
          <input name="backlogs" type="number" placeholder="Backlogs" onChange={handleChange} />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterStudent;

const wrapper = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f4f6f9"
};

const card = {
  width: "400px",
  background: "white",
  padding: "40px",
  borderRadius: "12px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  gap: "15px"
};
