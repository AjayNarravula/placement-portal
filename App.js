import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Dashboard from './pages/user/Dashboard';
import EligibleCompanies from './pages/user/EligibleCompanies';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import Profile from './pages/user/Profile';
import MyApplications from "./pages/user/MyApplications";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Companies" element={<EligibleCompanies />} />
        <Route path="/profile" element={<Profile />} />
        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/my-applications" element={<MyApplications />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;