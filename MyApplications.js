import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

export default function MyApplications() {

  const [apps, setApps] = useState([]);
  const email = localStorage.getItem("user");

  useEffect(() => {
    fetch("http://localhost:5000/applications")
      .then(res => res.json())
      .then(data => {
        const userApps = data.filter(a => a.userEmail === email);
        setApps(userApps);
      });
  }, [email]);

  

  const getColor = (status) => {
    if (status === "Selected") return "green";
    if (status === "Rejected") return "red";
    if (status === "Shortlisted") return "blue";
    return "orange";
  };

  return (
    <Layout>
      <h2>My Applications</h2>

      {apps.map(a => (
        <div key={a._id} className="card">
          <p><b>Company:</b> {a.companyName}</p>
          <p>
            <b>Status:</b>
            <span style={{ color: getColor(a.status), marginLeft: 10 }}>
              {a.status}
            </span>
          </p>
        </div>
      ))}
    </Layout>
  );
}