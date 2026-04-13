import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

export default function Dashboard() {

  const [companies, setCompanies] = useState([]);
  const [applications, setApplications] = useState([]);

const email = localStorage.getItem("user");
const name = localStorage.getItem("name");
  useEffect(() => {
    fetch("http://localhost:5000/companies")
      .then(res => res.json())
      .then(data => setCompanies(data));

    fetch("http://localhost:5000/applications")
      .then(res => res.json())
      .then(data => setApplications(data));
  }, []);

  // FILTER USER APPLICATIONS
  const myApps = applications.filter(a => a.userEmail === email);

  // STATUS COUNTS
  const selected = myApps.filter(a => a.status === "Selected").length;
  const rejected = myApps.filter(a => a.status === "Rejected").length;
  const shortlisted = myApps.filter(a => a.status === "Shortlisted").length;

 return (
  <Layout>
    <div style={{ padding: "10px" }}>

      {/* HEADER */}
      <h2 style={{ marginBottom: 5 }}>Dashboard</h2>
     <p style={{ color: "gray" }}>
  Welcome, {name || "User"} 👋
</p>

      {/* STATS GRID */}
      <div className="stats-grid">

        <div className="stat-card">
          <h3>{companies.length}</h3>
          <p>Companies</p>
        </div>

        <div className="stat-card">
          <h3>{myApps.length}</h3>
          <p>My Applications</p>
        </div>

        <div className="stat-card green">
          <h3>{selected}</h3>
          <p>Selected</p>
        </div>

        <div className="stat-card red">
          <h3>{rejected}</h3>
          <p>Rejected</p>
        </div>

        <div className="stat-card blue">
          <h3>{shortlisted}</h3>
          <p>Shortlisted</p>
        </div>

      </div>

      {/* RECENT */}
      <div style={{ marginTop: 30 }}>
        <h3>Recent Applications</h3>

        {myApps.length === 0 ? (
          <p style={{ color: "gray" }}>No applications yet</p>
        ) : (
          <div className="recent-list">
            {myApps.slice(0, 5).map(a => (
              <div key={a._id} className="recent-card">
                <div>
                  <h4>{a.companyName}</h4>
                  <p>Status: {a.status}</p>
                </div>

                <span className={`badge ${a.status.toLowerCase()}`}>
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  </Layout>
);

}