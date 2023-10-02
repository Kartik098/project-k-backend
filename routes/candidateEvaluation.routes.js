// userRoutes.js
const express = require('express');
const { CandidateEvaluationController } = require('../controllers');
const router = express.Router();


router.post('/create', CandidateEvaluationController.createCandidateEvaluation);
router.post('/:id', CandidateEvaluationController.updateCandidateEvaluation);
router.get('/get', CandidateEvaluationController.getAllCandidateEvaluations)



module.exports = router;
