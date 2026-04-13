import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    cgpa: ""
  });

  const register = async () => {
    if (!form.name || !form.email || !form.password || !form.cgpa) {
      alert("Fill all fields");
      return;
    }

    await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    alert("Registered Successfully");
    nav("/");
  };

  return (
    <div className="login-container">

      <div className="login-box">

        <h2>Register</h2>

        <input
          placeholder="Name"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <input
          type="number"
          placeholder="CGPA"
          onChange={e => setForm({ ...form, cgpa: e.target.value })}
        />

        <button onClick={register}>Register</button>

        <button
          className="secondary-btn"
          onClick={() => nav("/")}
        >
          Back to Login
        </button>

      </div>

    </div>
  );
}