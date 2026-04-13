import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
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

    if (data.message === "Login success") {
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("user", data.user.email);
      localStorage.setItem("role", data.role);
      nav("/dashboard");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="login-container">

      <div className="login-box">

        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          onChange={e => setPassword(e.target.value)}
        />

        {/* LOGIN BUTTON */}
        <button onClick={login}>
          Login
        </button>

        {/* SEPARATE BUTTONS */}
        <button
          className="secondary-btn"
          onClick={() => nav("/register")}
        >
          Register
        </button>

        <button
          className="admin-btn"
          onClick={() => nav("/admin")}
        >
          Admin Login
        </button>

      </div>

    </div>
  );
}