import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

export default function AdminDashboard() {

  const [companies, setCompanies] = useState([]);
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");

  const [form, setForm] = useState({
    name: "",
    cgpa: "",
    role: "",
    package: ""
  });

  // LOAD COMPANIES
  const loadCompanies = () => {
    fetch("http://localhost:5000/companies")
      .then(res => res.json())
      .then(data => setCompanies(data));
  };

  // LOAD APPLICATIONS
  const loadApplications = () => {
    fetch("http://localhost:5000/applications")
      .then(res => res.json())
      .then(data => setApplications(data));
  };

  useEffect(() => {
    loadCompanies();
    loadApplications();
  }, []);

  // ADD COMPANY
  const addCompany = async () => {
    if (!form.name || !form.cgpa) {
      alert("Fill all fields");
      return;
    }

    await fetch("http://localhost:5000/add-company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    alert("Company Added");

    setForm({
      name: "",
      cgpa: "",
      role: "",
      package: ""
    });

    loadCompanies();
  };

  // DELETE COMPANY
  const deleteCompany = async (id) => {
    await fetch(`http://localhost:5000/delete-company/${id}`, {
      method: "DELETE"
    });

    loadCompanies();
  };

  // UPDATE APPLICATION STATUS
  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/update-status/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status })
    });

    loadApplications();
  };


   return (
  <Layout>
    <div className="admin-container">

      <h2>Admin Panel</h2>

      {/* ================= ADD COMPANY ================= */}
      <div className="admin-section">
        <h3> Add Company</h3>

        <div className="card">
          <input
            placeholder="Company Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="CGPA"
            value={form.cgpa}
            onChange={e => setForm({ ...form, cgpa: e.target.value })}
          />

          <input
            placeholder="Role"
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
          />

          <input
            placeholder="Package"
            value={form.package}
            onChange={e => setForm({ ...form, package: e.target.value })}
          />

          <button onClick={addCompany}>Add Company</button>
        </div>
      </div>
      
      {/* ================= COMPANY LIST ================= */}
      <div className="admin-section">
        <h3>Companies</h3>
<input
  placeholder="Search company..."
  value={search}
  onChange={e => setSearch(e.target.value)}
/>
        <div className="admin-grid">
          {companies
  .filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )
  .map(c => (
    <div key={c._id} className="card">
      <h4>{c.name}</h4>
      <p>🎓 CGPA: {c.cgpa}</p>
      <p>💼 {c.role}</p>

      <button
        className="danger"
        onClick={() => deleteCompany(c._id)}
      >
        Delete
      </button>
    </div>
))}
        </div>
      </div>

      {/* ================= APPLICATIONS ================= */}
      <div className="admin-section">
        <h3> Applications</h3>
<select
  value={statusFilter}
  onChange={e => setStatusFilter(e.target.value)}
>
  <option value="All">All</option>
  <option value="Applied">Applied</option>
  <option value="Shortlisted">Shortlisted</option>
  <option value="Selected">Selected</option>
  <option value="Rejected">Rejected</option>
</select>
        <div className="admin-grid">
          {applications
  .filter(a =>
    statusFilter === "All" || a.status === statusFilter
  )
  .map(a => (
    <div key={a._id} className="card">
      <p><b>👨‍🎓</b> {a.userEmail}</p>
      <p><b>🏢</b> {a.companyName}</p>

      <span className={`badge ${a.status.toLowerCase()}`}>
        {a.status}
      </span>

      <div className="btn-group">
        <button onClick={() => updateStatus(a._id, "Shortlisted")}>
          Shortlist
        </button>

        <button
          className="success"
          onClick={() => updateStatus(a._id, "Selected")}
        >
          Select
        </button>

        <button
          className="danger"
          onClick={() => updateStatus(a._id, "Rejected")}
        >
          Reject
        </button>
      </div>
    </div>
))}
        </div>
      </div>

    </div>
  </Layout>
);
}