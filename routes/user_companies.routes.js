// userRoutes.js
const express = require('express');
const { UserCompaniesController } = require('../controllers');
const router = express.Router();


router.post('/create', UserCompaniesController.createCompany);



module.exports = router;
