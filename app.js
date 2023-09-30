const express = require('express');
const mainRouter = require('./routes');

// Create an instance of Express
const app = express();
app.use(express.json());

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.use(express.urlencoded({ extended: true }));
// Use the main router
app.use('/v1', mainRouter);
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});