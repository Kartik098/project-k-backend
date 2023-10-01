const mongoose = require('mongoose');
const Joi = require('joi');

// Define the candidate schema
const candidateSchema = new mongoose.Schema({
  contractor_name: {
    type: String,
    required: true,
  },
    trade: {
    type: String,
    required: true,
  },
    discipline: {
    type: String,
    required: true,
  },
    candidate_name: {
    type: String,
    required: true,
  },
    user_photo: {
    type: String,
    required: true,
  },
    id_number: {
    type: String,
    required: true,
  },
    contact: {
    type: String,
    required: true,
  },
    email: {
    type: String,
    required: true,
  },
    nationality: {
    type: String,
    required: true,
  },
    state: {
    type: String,
    required: true,
  },
    marital_status: {
    type: String,
    required: true,
  },
    dateOfBirth: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
    write: {
    type: String,
    required: true,
  },
    speak: {
    type: String,
    required: true,
  },
    academic_qualification: {
    type: String,
    required: true,
  },
    other_qualification: {
    type: String,
    required: true,
  }
});

// Create a Candidates model based on the schema
const Candidates = mongoose.model('Candidates', candidateSchema);

// Export the Candidates model
module.exports = Candidates;