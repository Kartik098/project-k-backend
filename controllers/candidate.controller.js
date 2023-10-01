const { CandidateServices } = require("../services");

const createCandidate = async (req, res, next) => {

    const result = await CandidateServices.createCandidate(req.body,res, next)
  
    // res.send(result)
  };
const getAllCandidates = async (req, res, next) => {
  const result = await CandidateServices.getAllCandidates(req.body, res)
}
  module.exports = {
    createCandidate,
    getAllCandidates
}