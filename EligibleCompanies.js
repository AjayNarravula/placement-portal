import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

export default function EligibleCompanies() {

  const [companies, setCompanies] = useState([]);
  const email = localStorage.getItem("user");

  useEffect(() => {
    fetch("http://localhost:5000/companies")
      .then(res => res.json())
      .then(data => setCompanies(data));
  }, []);

  const applyCompany = async (company) => {
    const res = await fetch("http://localhost:5000/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userEmail: email,
        companyId: company._id,
        companyName: company.name
      })
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <Layout>
      <h2>Companies</h2>

      {companies.map(c => (
        <div key={c._id} className="card">
          <h3>{c.name}</h3>
          <p>{c.role}</p>

          <button onClick={() => applyCompany(c)}>
            Apply
          </button>
        </div>
      ))}
    </Layout>
  );
}