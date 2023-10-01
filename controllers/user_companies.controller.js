// userController.js
const {  UserCompaniesServices } = require("../services/index")



const createCompany = async (req, res, next) => {

  const result = await UserCompaniesServices.createCompany(req.body,res, next)

};

// exports.updateUser = (req, res) => {
//   // Implementation to update a user
// };

// exports.deleteUser = (req, res) => {
//   // Implementation to delete a user
// };

module.exports = {
    createCompany,
    
}