import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

export default function Profile() {

  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);

  const email = localStorage.getItem("user");

  const loadProfile = () => {
    fetch(`http://localhost:5000/profile/${email}`)
      .then(res => res.json())
      .then(data => setUser(data));
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const updateProfile = async () => {
    await fetch(`http://localhost:5000/update-profile/${email}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: user.name,
        password: user.password,
        cgpa: user.cgpa
      })
    });

    alert("Profile Updated");
    setEdit(false);
    loadProfile();
  };

  if (!user) {
    return <Layout>Loading...</Layout>;
  }

 return (
  <Layout>
    <div className="profile-container">

      <div className="profile-card">

        {/* HEADER */}
        <div className="profile-header">
          <div className="avatar">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>

        {/* DETAILS */}
        <div className="profile-details">

          {/* NAME */}
          <div className="field">
            <label>Name</label>
            {edit ? (
              <input
                value={user.name}
                onChange={e => setUser({ ...user, name: e.target.value })}
              />
            ) : (
              <p>{user.name}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="field">
            <label>Password</label>
            {edit ? (
              <input
                type="password"
                value={user.password}
                onChange={e => setUser({ ...user, password: e.target.value })}
              />
            ) : (
              <p>******</p>
            )}
          </div>

          {/* CGPA */}
          <div className="field">
            <label>CGPA</label>
            {edit ? (
              <input
                value={user.cgpa}
                onChange={e => setUser({ ...user, cgpa: e.target.value })}
              />
            ) : (
              <p>{user.cgpa}</p>
            )}
          </div>

        </div>

        {/* BUTTONS */}
        <div className="profile-actions">
          {edit ? (
            <button onClick={updateProfile}>Save Changes</button>
          ) : (
            <button onClick={() => setEdit(true)}>Edit Profile</button>
          )}
        </div>

      </div>

    </div>
  </Layout>
);
}