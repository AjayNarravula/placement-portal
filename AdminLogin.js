import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (!email || !password) {
      alert("Enter all fields");
      return;
    }

    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.message === "Login success" && data.role === "admin") {
      localStorage.setItem("user", data.user.email);
      localStorage.setItem("role", "admin");

      nav("/admin/dashboard");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="login-container">

      <div className="login-box">

        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Admin Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button onClick={login}>Login</button>

        <button
          className="secondary-btn"
          onClick={() => nav("/")}
        >
          Back to User Login
        </button>

      </div>

    </div>
  );
}