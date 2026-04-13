import { useNavigate } from "react-router-dom";
import "./Layout.css";

export default function Layout({ children }) {
  const nav = useNavigate();
  const role = localStorage.getItem("role");

  return (
    <div className="layout">

      {/* Sidebar */}
      <div className="sidebar">
        <h2>Placement Portal</h2>

        {role === "student" && (
          <>
            <button onClick={() => nav("/dashboard")}>Dashboard</button>
            <button onClick={() => nav("/companies")}>Companies</button>
            <button onClick={() => nav("/profile")}>Profile</button>
            <button onClick={() => nav('/my-applications')}>
  My Applications
</button>
          </>
        )}

        {role === "admin" && (
          <button onClick={() => nav("/admin/dashboard")}>Admin Panel</button>
        )}

        <button className="logout" onClick={() => {
          localStorage.clear();
          nav("/");
        }}>
          Logout
        </button>
      </div>

      {/* Main */}
      <div className="main">
        <div className="topbar">Welcome</div>
        <div className="content">{children}</div>
      </div>

    </div>
  );
}