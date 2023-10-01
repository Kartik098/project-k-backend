// userRoutes.js
const express = require('express');
const { CandidateController } = require('../controllers');
const router = express.Router();

// Define routes for users
// router.get('/', UserController.getAllUsers);
router.get('/get', CandidateController.getAllCandidates);
router.post('/create', CandidateController.createCandidate);
// router.post('/login', UserController.loginUser);

// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

module.exports = router;
