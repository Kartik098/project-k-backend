const UserController = require('./user.controller');
const CandidateController = require('./candidate.controller');
const UserCompaniesController = require('./user_companies.controller');



// Export the models with different names
module.exports = {
  UserController,
  CandidateController,
  UserCompaniesController
 
};