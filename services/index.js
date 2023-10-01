const UserServices = require('./user.services');
const CandidateServices = require('./candidate.services');
const UserCompaniesServices = require('./user_companies.service');



// Export the models with different names
module.exports = {
   UserServices,
   CandidateServices,
   UserCompaniesServices
};