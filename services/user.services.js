// userModel.js
const db = require('../db');
const { v4: uuidv4 } = require('uuid');
const {  ApiError } = require('../error/error.js');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const HttpStatus = require('http-status-codes');

async function createUser(userData, res, next) {
  // console.log(userData);
  let user = await findUserByEmail(userData.email)

  if(user){
    
     res.status(HttpStatus.BAD_REQUEST).json({ message: 'Email already used' });
     return 
  }
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
  const query = 'SELECT id, email, firstName, lastName, password FROM users WHERE email = ?';

  const values = [email];

  db.query(query, values, async (error, results) => {
    if (error) {
      return next(error); // Return to exit the function after calling 'next()'
    }

    if (results.length === 0) {
      // User not found
     
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Authentication failed' });
    }

    const user = results[0];
    const hashedPassword = user.password;

    try {
      const isPasswordValid = await bcrypt.compare(password, hashedPassword);

      if (!isPasswordValid) {
     

        // Invalid password
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Authentication failed' });
      }

      const userData = {
        userId: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName:user.lastName
        // Add any other user data you want to include
      };

      // Generate a JWT token with the entire userData
      const token = jwt.sign(userData, 'your-secret-key', { expiresIn: '1h' });

      // For demonstration, you can send the token in the response
      return res.status(HttpStatus.OK).json({ message: 'Authentication successful', token });
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
