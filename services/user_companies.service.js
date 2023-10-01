// userModel.js
const db = require('../db');
const { v4: uuidv4 } = require('uuid');
const {  ApiError } = require('../error/error.js');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const HttpStatus = require('http-status-codes');

async function createCompany(userData, res, next) {
 
  // Generate a unique ID for the user
  const uniqueID = uuidv4();


  const values = [uniqueID, userData.nameOfTheCompany, userData.designation, userData.startDate, userData.endDate, userData.userId];
  const query = `INSERT INTO user_companies (id, nameOfTheCompany, designation, startDate, endDate, userId) VALUES ('${uniqueID}','${userData.nameOfTheCompany}', '${userData.designation}', '${userData.startDate}', '${userData.endDate}', '${userData.userId}')`;


  db.query(query, values, (error, results) => {
    if (error) {
      const errorObj = new Error(error);
      errorObj.status = 400; // Set an appropriate status code
      res.status(HttpStatus.BAD_REQUEST).json({ message:error.message });
      return next()
    } else {
      console.log(results)
      res.status(HttpStatus.OK).json({ message: 'Company created successfully!', data: userData });
      return
      // return next(null, results);
    }
  });
}
 // Import the library





module.exports = {
    createCompany
};
