const Joi = require('joi');

// Define a Joi schema for user data validation
const signupUser = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Validate user data


module.exports = {
  signupUser,
};