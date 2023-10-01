// userRoutes.js
const express = require('express');
const { CandidateEvaluationController } = require('../controllers');
const router = express.Router();


router.post('/create', CandidateEvaluationController.createCandidateEvaluation);



module.exports = router;
