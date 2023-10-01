const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes')
const candidateRoutes = require('./candidate.routes')
const userCompanyRoutes = require('./user_companies.routes')
const candidateEvaluationRoutes = require('./candidateEvaluation.routes')



const routeObjects = [
    {
      path: '/users',
      routes: userRoutes,
    }, {
      path: '/candidates',
      routes: candidateRoutes,
    }, {
      path: '/user-company',
      routes: userCompanyRoutes,
    },{
      path: '/evaluations',
      routes: candidateEvaluationRoutes,
    }
    
    // Add more route objects as needed
  ];
  
  // Register routes based on the route objects
  routeObjects.forEach((routeObject) => {
    router.use(routeObject.path, routeObject.routes);
  });
  
  module.exports = router;