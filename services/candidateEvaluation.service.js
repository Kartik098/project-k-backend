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
 async function getAllCandidateEvaluations( req, res) {
  let query = `SELECT
  c.*,
  JSON_OBJECT(
    'id', u.id,
    'candidate_name', u.candidate_name,
    'contractor_name', u.contractor_name,
    'trade', u.trade,
    'discipline', u.discipline,
    'user_photo', u.user_photo,
    'email', u.email,
    'nationality', u.nationality,
    'state', u.state,
    'marital_status', u.marital_status,
    'dateOfBirth', u.dateOfBirth,
    'read', u.read,
    'write', u.write,
    'speak', u.speak,
    'academic_qualification', u.academic_qualification,
    'other_qualification', u.other_qualification,
    'id_number', u.id_number,
    'contact', u.contact,
    'createdDate', u.createdDate
  ) AS candidateData
FROM candidateevaluations c
LEFT JOIN candidates u ON c.candidateId = u.id
WHERE 1=1`
// Start with a WHERE 1=1 condition
  const values = [];

  // Check for query parameters and add conditions to the query as needed
  if (req.query.id) {
    query += ' AND id = ?';
    values.push(req.query.id);
  }

  if (req.query.candidateId) {
    query += ' AND candidateId = ?';
    values.push(req.query.candidateId);
  }



  return new Promise((resolve, reject) => {
    db.query(query, values, (error, results) => {
      if (error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
      } else {
        res.status(HttpStatus.OK).json({ results });
      }
    });
  });
}
 async function updateCandidateEvaluation(req, res) {
  const { id } = req.params; // Extract the candidate ID from the request parameters
  console.log(id)
  const updatedData = req.body; // Updated data should be sent in the request body

  if (!id) {
    return res.status(HttpStatus.BAD_REQUEST).json({ message: 'evaluation ID is required.' });
  }

  if (!updatedData || Object.keys(updatedData).length === 0) {
    return res.status(HttpStatus.BAD_REQUEST).json({ message: 'No data provided for update.' });
  }

  const query = 'UPDATE candidateevaluations SET ? WHERE id = ?'; // Use ? as a placeholder for the updated data
  const values = [updatedData, id];

  return new Promise((resolve, reject) => {
    db.query(query, values, (error, result) => {
      if (error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
      } else {
        if (result.affectedRows === 0) {
          res.status(HttpStatus.NOT_FOUND).json({ message: 'Evaluation not found.' });
        } else {
          res.status(HttpStatus.OK).json({ message: 'Evaluation updated successfully.' });
        }
      }
    });
  });
}



module.exports = {
    createCandidateEvaluation,
  updateCandidateEvaluation,
getAllCandidateEvaluations
};
