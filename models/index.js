const UserModel = require('./user.model');
const CandidateModel = require('./candidate.model')
// Export the models with different names
module.exports = {
  User: UserModel,
  Candidate: CandidateModel
 
};