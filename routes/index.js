const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes')
const routeObjects = [
    {
      path: '/users',
      routes: userRoutes,
    }
    // Add more route objects as needed
  ];
  
  // Register routes based on the route objects
  routeObjects.forEach((routeObject) => {
    router.use(routeObject.path, routeObject.routes);
  });
  
  module.exports = router;