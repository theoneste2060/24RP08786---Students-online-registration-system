require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Joi = require('joi');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/student-registration', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Student Schema
const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  studentId: { type: String, required: true, unique: true },
  course: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now }
});

const Student = mongoose.model('Student', studentSchema);

// Validation Schema
const studentValidationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  studentId: Joi.string().required(),
  course: Joi.string().required()
});

// RESTful API Routes
// Health check endpoint
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok' });
});

// Student registration endpoint
app.post('/api/students', async (req, res) => {
  try {
    const { error } = studentValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const student = new Student(req.body);
    await student.save();
    res.status(201).json({
      message: 'Student registered successfully',
      student: student
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

app.get('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student' });
  }
});

app.put('/api/students/:id', async (req, res) => {
  try {
    const { error } = studentValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

app.delete('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Deletion failed' });
  }
});

// Test route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(port, () => {
  console.log(`Backend service running on port ${port}`);
});

module.exports = app; // For testing purposes