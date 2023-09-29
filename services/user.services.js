// userModel.js
const db = require('../db');

async function createUser(userData) {
  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  const values = [userData.username, userData.email, userData.password];

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
