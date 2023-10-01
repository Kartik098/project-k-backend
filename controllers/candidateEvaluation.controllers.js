// userController.js
const {  CandidateEvaluationServices } = require("../services/index")



const createCandidateEvaluation = async (req, res, next) => {
    console.log("hello")

  const result = await CandidateEvaluationServices.createCandidateEvaluation(req.body,res, next)

};

// exports.updateUser = (req, res) => {
//   // Implementation to update a user
// };

// exports.deleteUser = (req, res) => {
//   // Implementation to delete a user
// };

module.exports = {
    createCandidateEvaluation,
    
}