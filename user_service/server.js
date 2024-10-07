require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors module
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const pageRoutes = require('./routes/page');

// express app
const app = express();

// middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/page', pageRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
