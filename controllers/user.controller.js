// userController.js
const {  UserServices } = require("../services/index")

// Define controller methods
const getAllUsers = (req, res) => {
  // Implementation to get all users
};

const getUserById = (req, res) => {
  // Implementation to get a user by ID
};

const createUser = async (req, res) => {
  console.log(req.body)
  const result = await UserServices.createUser(req.body)
};

// exports.updateUser = (req, res) => {
//   // Implementation to update a user
// };

// exports.deleteUser = (req, res) => {
//   // Implementation to delete a user
// };

module.exports = {
    createUser
}