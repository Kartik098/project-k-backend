const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes')
const candidateRoutes = require('./candidate.rputes')

const routeObjects = [
    {
      path: '/users',
      routes: userRoutes,
    }, {
      path: '/candidates',
      routes: candidateRoutes,
    },
    
    // Add more route objects as needed
  ];
  
  // Register routes based on the route objects
  routeObjects.forEach((routeObject) => {
    router.use(routeObject.path, routeObject.routes);
  });
  
  module.exports = router;