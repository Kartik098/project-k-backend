// userModel.js
const db = require('../db');
const { v4: uuidv4 } = require('uuid');
const {  ApiError } = require('../error/error.js');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const HttpStatus = require('http-status-codes');

async function createCandidate(body, res, next) {
  // console.log(userData);
  let user = await findCandidateByEmail(body.email)

  if(user){
    console.log("hello", user)
     res.status(HttpStatus.BAD_REQUEST).json({ message: 'Email already used' });
     return 
  }
  let user1 = await findCandidateById_Number(body.id_number)

  if(user1){
    // console.log("hello", user)
     res.status(HttpStatus.BAD_REQUEST).json({ message: 'Id number must be unique' });
     return 
  }
  // console.log(userData);
   console.log(body)
const {contractor_name,
  trade,
  discipline,
  candidate_name,
  user_photo,
  id_number,
  contact,
  email,
  nationality,
  state,
  marital_status,
  dateOfBirth,
  read,
  write,
  speak,
  academic_qualification,
  other_qualification} = body
  // Generate a unique ID for the user
  const id = uuidv4();

  // Hash the user's password
  // 10 is the number of salt rounds

  const values = [id ,contractor_name,
    trade,
    discipline,
    candidate_name,
    user_photo,
    id_number,
    contact,
    email,
    nationality,
    state,
    marital_status,
    dateOfBirth,
    read,
    write,
    speak,
    academic_qualification,
    other_qualification];
    const query = `INSERT INTO candidates (id ,contractor_name,
      trade,
      discipline,
      candidate_name,
      user_photo,
      id_number,
      contact,
      email,
      nationality,
      state,
      marital_status,
      dateOfBirth,
      \`read\`,
      \`write\`,
      \`speak\`,
      academic_qualification,
      other_qualification) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?,?, ?, ?, ?, ?, ?)`;
  


  db.query(query, values, (error, results) => {
    if (error) {
      const errorObj = new Error(error);
      console.log("hello")
      res.status(HttpStatus.BAD_REQUEST).json({ message:error.message });
      return next()
    } else {
      res.status(HttpStatus.OK).json({ message: 'Candidate created successfully!', data: results[0] });
      return
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

async function findCandidateByEmail(email) {
  const query = 'SELECT * FROM candidates WHERE email = ?';
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
async function findCandidateById_Number(id) {
  const query = 'SELECT * FROM candidates WHERE id_number = ?';
  const values = [id];

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
  createCandidate,
  findCandidateByEmail

};
