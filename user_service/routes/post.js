const express = require('express');

// controller functions
const { createPost, deletePost, postLike, getPostsByPage,getAllPostsByUser } = require('../controllers/postController');

// Autherization and Routes
const authMiddleware = require('../middleware/requireAuth.js');
const router = express.Router();

// Create a post
router.post('/createPost', authMiddleware, createPost); 

// Delete a post
router.delete('/deletePost/:postID', authMiddleware, deletePost); 

// Like/Unlike a post
router.post('/likePost/:postID/like', authMiddleware, postLike); 

router.get('/getPosts/:pageID/posts', authMiddleware, getPostsByPage);

router.get('/getPostsByUser/:userID/posts', authMiddleware, getAllPostsByUser);

module.exports = router;
