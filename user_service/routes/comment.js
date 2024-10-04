const express = require('express')

// controller functions
const { createComment, deleteComment, commentLike } = require('../controllers/commentController');

// Autherization and Routes
const authMiddleware = require('../middleware/requireAuth.js');
const router = express.Router();

// Create a comment
router.post('/', authMiddleware, createComment); 

// Delete a comment
router.delete('/:commentID', authMiddleware, deleteComment); 

// Like/Unlike a comment
router.post('/:commentID/like', authMiddleware, commentLike); 

module.exports = router