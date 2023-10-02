const { CandidateServices } = require("../services");


const updateCandidate = async (req, res, next) => {

  const result = await CandidateServices.updateCandidate(req,res)

  // res.send(result)
};
const createCandidate = async (req, res, next) => {

    const result = await CandidateServices.createCandidate(req.body,res, next)
  
    // res.send(result)
  };
const getAllCandidates = async (req, res, next) => {
  const result = await CandidateServices.getAllCandidates(req, res)
}
  module.exports = {
    createCandidate,
    getAllCandidates,
    updateCandidate
}