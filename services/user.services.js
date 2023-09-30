// userModel.js
const db = require('../db');
const { v4: uuidv4 } = require('uuid');
const {  ApiError } = require('../error/error.js');
const bcrypt = require('bcrypt');
const HttpStatus = require('http-status-codes');
async function createUser(userData, next) {
  console.log(userData);

  // Generate a unique ID for the user
  const uniqueID = uuidv4();

  // Hash the user's password
  const hashedPassword = await bcrypt.hash(userData.password, 10); // 10 is the number of salt rounds

  const values = [uniqueID, userData.firstName, userData.lastName, userData.email, hashedPassword];
  const query = `INSERT INTO users (id, firstName, lastName, email, password) VALUES ('${uniqueID}','${userData.firstName}', '${userData.lastName}', '${userData.email}', '${hashedPassword}')`;


  db.query(query, values, (error, results) => {
    if (error) {
      const errorObj = new Error(error);
      errorObj.status = 400; // Set an appropriate status code
      return next(errorObj);
    } else {
      return next(null, results);
    }
  });
}
 // Import the library

async function login(body, res, next) {
  const { email, password } = body;

  // Replace 'users' with your actual table name
  const query = 'SELECT id, email, password FROM users WHERE email = ?';

  const values = [email];

  db.query(query, values, async (error, results) => {
    if (error) {
      return next(error); // Return to exit the function after calling 'next()'
    }

    if (results.length === 0) {
      // User not found
      console.log("Hello")
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Authentication failed' });
    }

    const user = results[0];
    const hashedPassword = user.password;

    try {
      const isPasswordValid = await bcrypt.compare(password, hashedPassword);

      if (!isPasswordValid) {
      console.log("Hello1")

        // Invalid password
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Authentication failed' });
      }

      // Password is valid; you can create a JWT token or session here for authentication
      console.log("Hello3")

      // For demonstration, you can send a success response
      return res.status(HttpStatus.OK).json({ message: 'Authentication successful', userId: user.id });
    } catch (compareError) {
      return next(compareError); // Return to exit the function after calling 'next()'
    }
  });
}

async function findUserByEmail(email) {
  const query = 'SELECT * FROM users WHERE email = ?';
  const values = [email];

  return new Promise((resolve, reject) => {
    db.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]); // Assuming there's only one user with the same email
      }
    });
  });
}

module.exports = {
  createUser,
  findUserByEmail,
  login
};
