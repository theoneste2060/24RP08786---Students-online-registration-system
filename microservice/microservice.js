require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Joi = require('joi');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Validation Schema
const studentValidationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  studentId: Joi.string().required(),
  course: Joi.string().required()
});

// Validation endpoint
app.post('/api/validate', async (req, res) => {
  try {
    const { error } = studentValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        isValid: false,
        error: error.details[0].message
      });
    }

    // Additional validation logic can be added here
    // For example, checking if email domain is valid
    const emailDomain = req.body.email.split('@')[1];
    const validDomains = ['student.edu', 'university.edu'];
    
    if (!validDomains.includes(emailDomain)) {
      return res.status(400).json({
        isValid: false,
        error: 'Invalid email domain for student registration'
      });
    }

    res.json({
      isValid: true,
      message: 'Student data is valid'
    });
  } catch (error) {
    res.status(500).json({
      isValid: false,
      error: 'Validation service error'
    });
  }
});

// Health check endpoint
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(port, () => {
  console.log(`Validation microservice running on port ${port}`);
});

module.exports = app; // For testing purposes