// userModel.js
const db = require('../db');
const { v4: uuidv4 } = require('uuid');
const {  ApiError } = require('../error/error.js');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const HttpStatus = require('http-status-codes');

async function createCandidateEvaluation(body, res, next) {
console.log("hello")

    const {
        evaluation,
         lastEvaluatedDate,
          writtenMarks,
           oralMarks,
            practicalMarks,
             behaviourMarks,
              totalMarks,
        candidateId,
        pmOfLtMotors,
        pmOfSwitchGear,
        pmOfPP,
        pmOfHtMotors,
        cmOfSwitchGear,
        pmOfLdb,
        cmOfLtMotors,
        pmOfPowerTransformer,
        meggering,
        cmOfHtMotors,
        cmOfPowerTransformer,
        basicSafety,
        pmOfEarthPit,
        glandingAndTermination,
        tbraAndHitra,
        cableLaying,
        lprzt,
        emergencyResponse,
        toolBoxTalk,
        rolesAndResponsibilities,
        workPermitSystem,
        writtenPhotoUrl,
        oralVideoUrl,
        practicalPhotoUrl
    } = body
  // Generate a unique ID for the user
  const uniqueID = uuidv4();
console.log("hello")

const query = `INSERT INTO candidateevaluations (
  id, evaluation, lastEvaluatedDate, writtenMarks, oralMarks, practicalMarks, totalMarks, pmOfLtMotors, pmOfSwitchGear, pmOfPP, pmOfHtMotors, 
  cmOfSwitchGear, pmOfLdb, cmOfLtMotors, pmOfPowerTransformer, meggering, cmOfHtMotors, 
  cmOfPowerTransformer, basicSafety, pmOfEarthPit, glandingAndTermination, tbraAndHitra, 
  cableLaying, emergencyResponse, toolBoxTalk, rolesAndResponsibilities, lprzt, 
  workPermitSystem, writtenPhotoUrl, oralVideoUrl,practicalPhotoUrl,behaviourMarks, candidateId
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

const values = [
  /* Add your values here in the same order as the fields in the query */
  uniqueID, evaluation, lastEvaluatedDate, writtenMarks, oralMarks, practicalMarks, totalMarks, pmOfLtMotors, pmOfSwitchGear, pmOfPP, pmOfHtMotors, 
  cmOfSwitchGear, pmOfLdb, cmOfLtMotors, pmOfPowerTransformer, meggering, cmOfHtMotors, 
  cmOfPowerTransformer, basicSafety, pmOfEarthPit, glandingAndTermination, tbraAndHitra, 
  cableLaying, emergencyResponse, toolBoxTalk, rolesAndResponsibilities, lprzt, 
  workPermitSystem, writtenPhotoUrl, oralVideoUrl,practicalPhotoUrl,behaviourMarks, candidateId
];



  db.query(query, values, (error, results) => {
    if (error) {
      const errorObj = new Error(error);
      errorObj.status = 400; // Set an appropriate status code
      res.status(HttpStatus.BAD_REQUEST).json({ message:error.message });
      return next()
    } else {
      console.log(results)
      res.status(HttpStatus.OK).json({ message: 'Evaluation created successfully!', data: body });
      return
      // return next(null, results);
    }
  });
}
 // Import the library





module.exports = {
    createCandidateEvaluation
};
