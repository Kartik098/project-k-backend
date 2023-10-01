const { CandidateServices } = require("../services");

const createCandidate = async (req, res, next) => {

    const result = await CandidateServices.createCandidate(req.body,res, next)
  
    // res.send(result)
  };
  module.exports = {
    createCandidate
}