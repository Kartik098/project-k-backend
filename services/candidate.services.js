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
const {
  contractor_name,
  trade,
  discipline,
  candidate_name,
  user_photo,
  id_number,
  contact,
  createdDate,
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

  const values = [
    id,
    candidate_name,
    contractor_name,
    trade,
    discipline,
    user_photo,
    email,
    nationality,
    state,
    marital_status,
    dateOfBirth,
    read,
    write,
    speak,
    academic_qualification,
    other_qualification,
    id_number,
    contact,
    createdDate,
  ];
  
  const query = `INSERT INTO candidates (
    id,
    candidate_name,
    contractor_name,
    trade,
    discipline,
    user_photo,
    email,
    nationality,
    state,
    marital_status,
    dateOfBirth,
    \`read\`,
    \`write\`,
    \`speak\`,
    academic_qualification,
    other_qualification,
    id_number,
    contact,
    createdDate,
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  


  db.query(query, values, (error, results) => {
    if (error) {
      const errorObj = new Error(error);
      console.log("hello")
      res.status(HttpStatus.BAD_REQUEST).json({ message:error.message });
      return next()
    } else {
      console.log(results)
      res.status(HttpStatus.OK).json({ message: 'Candidate created successfully!', candidate:{id, ...body}  });
      return
    }
  });
}
 // Import the library



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
async function getAllCandidates(data, res) {
  let query = 'SELECT * FROM candidates';
  const values = [];
  return new Promise((resolve, reject) => {
    db.query(query, values, (error, results) => {
      if (error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message:error.message });
      return next()
      } else {
        res.status(HttpStatus.OK).json({ results:results  });

       
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
  findCandidateByEmail,
  getAllCandidates

};
