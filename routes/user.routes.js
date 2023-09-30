// userRoutes.js
const express = require('express');
const { UserController } = require('../controllers');
const router = express.Router();

// Define routes for users
// router.get('/', UserController.getAllUsers);
// router.get('/:id', userController.getUserById);
router.post('/', UserController.createUser);
router.post('/login', UserController.loginUser);

// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

module.exports = router;
