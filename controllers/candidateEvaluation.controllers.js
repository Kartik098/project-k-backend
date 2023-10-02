// userController.js
const {  CandidateEvaluationServices } = require("../services/index")



const createCandidateEvaluation = async (req, res, next) => {
    console.log("hello")

  const result = await CandidateEvaluationServices.createCandidateEvaluation(req.body,res, next)

};
const updateCandidateEvaluation = async (req, res, next) => {

  const result = await CandidateEvaluationServices.updateCandidateEvaluation(req,res)

  // res.send(result)
};
const getAllCandidateEvaluations = async (req, res, next) =>{
  const result = await CandidateEvaluationServices.getAllCandidateEvaluations(req,res)

}
// exports.updateUser = (req, res) => {
//   // Implementation to update a user
// };

// exports.deleteUser = (req, res) => {
//   // Implementation to delete a user
// };

module.exports = {
    createCandidateEvaluation,
    updateCandidateEvaluation,
    getAllCandidateEvaluations
}