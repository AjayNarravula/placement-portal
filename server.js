const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/placementDB')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// TEST
app.get('/test', (req, res) => {
  res.send("Server is working");
});

// MODELS
const User = mongoose.model('User', {
  name: String,
  email: String,
  password: String,
  role: String,
});

const Company = mongoose.model('Company', {
  name: String,
  cgpa: String,
  role: String,
  package: String
});
// APPLICATION MODEL
const Application = mongoose.model('Application', {
  userEmail: String,
  companyId: String,
  companyName: String,
  status: {
    type: String,
    default: "Applied"
  }
});

app.delete('/delete-company/:id', async (req, res) => {
  await Company.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});
app.delete('/delete-company/:id', async (req, res) => {
  try {
    const companyId = req.params.id;

    // 1. Delete company
    await Company.findByIdAndDelete(companyId);

    // 2. Delete related applications
    await Application.deleteMany({ companyId: companyId });

    res.json({ message: "Company and related applications deleted" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting company" });
  }
});

/* ========= AUTH ========= */

// REGISTER
app.post('/register', async (req, res) => {
  const { name, email, password, cgpa } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.json({ message: "User exists" });

  const user = new User({
    name,
    email,
    password,
    cgpa,
    role: "student"
  });

  await user.save();
  res.json({ message: "Registered" });
});

// LOGIN
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) return res.json({ message: "Invalid credentials" });

    res.json({
      message: "Login success",
      role: user.role,
      user
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ========= PROFILE ========= */

// GET PROFILE
app.get('/profile/:email', async (req, res) => {
  const user = await User.findOne({ email: req.params.email });

  if (!user) return res.json({ message: "User not found" });

  res.json(user);
});

// UPDATE PROFILE
app.put('/update-profile/:email', async (req, res) => {
  const { name, password, cgpa } = req.body;

  const user = await User.findOneAndUpdate(
    { email: req.params.email },
    { name, password, cgpa },
    { new: true }
  );

  res.json({ message: "Updated", user });
});

/* ========= COMPANY ========= */
// APPLY FOR COMPANY
app.post('/apply', async (req, res) => {
  const { userEmail, companyId, companyName } = req.body;

  const existing = await Application.findOne({ userEmail, companyId });

  if (existing) {
    return res.json({ message: "Already applied" });
  }

  const appData = new Application({
    userEmail,
    companyId,
    companyName
  });

  await appData.save();

  res.json({ message: "Applied successfully" });
});
app.get('/applications', async (req, res) => {
  const data = await Application.find();
  res.json(data);
});
app.put('/update-status/:id', async (req, res) => {
  const { status } = req.body;

  await Application.findByIdAndUpdate(req.params.id, { status });

  res.json({ message: "Status Updated" });
});
// REJECT APPLICATION
app.put('/reject/:id', async (req, res) => {
  await Application.findByIdAndUpdate(req.params.id, {
    status: "Rejected"
  });

  res.json({ message: "Application Rejected" });
});
app.post('/apply', async (req, res) => {
  const { userEmail, companyId, companyName } = req.body;

  const existing = await Application.findOne({ userEmail, companyId });

  if (existing) {
    return res.json({ message: "Already applied" });
  }

  const appData = new Application({
    userEmail,
    companyId,
    companyName
  });

  await appData.save();

  res.json({ message: "Applied successfully" });
});
// UPDATE STATUS (shortlist / select / reject)
app.put('/update-status/:id', async (req, res) => {
  const { status } = req.body;

  await Application.findByIdAndUpdate(req.params.id, { status });

  res.json({ message: "Status Updated" });
});

// ADD
app.post('/add-company', async (req, res) => {
  const company = new Company(req.body);
  await company.save();
  res.json({ message: "Added" });
});

// GET
app.get('/companies', async (req, res) => {
  const data = await Company.find();
  res.json(data);
});

// DELETE
app.delete('/delete-company/:id', async (req, res) => {
  await Company.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));