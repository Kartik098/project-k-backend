// userModel.js
const db = require('../db');

async function createUser(userData) {
  console.log(userData)
  const values = [userData.firstName, userData.lastName, userData.email, userData.password];
  const query = `INSERT INTO users (firstName, lastName, email, password) VALUES (${userData.firstName}, ${userData.lastName}, ${userData.email}, ${userData.password})`;

  return new Promise((resolve, reject) => {
    db.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
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
};
