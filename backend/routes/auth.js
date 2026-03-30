const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authenticate, authController.getCurrentUser);
router.put('/profile', authenticate, authController.updateProfile);

// Get user profile by ID (public)
router.get('/users/:userId', authController.getUserProfile);

module.exports = router;
