const express = require('express')

// controller functions
const { createPage, deletePage } = require('../controllers/pageController')

// Autherization and Routes
const authMiddleware = require('../middleware/requireAuth.js');
const router = express.Router();

// Create a page
router.post('/createPages', authMiddleware, createPage)

// Delete a page
router.delete('/deletePage/:pageID', authMiddleware, deletePage)

module.exports = router