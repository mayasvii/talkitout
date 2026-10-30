const express = require('express');
const router = express.Router();

const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

/**
 * Authentication Routes
 * Base prefix: /api/auth
 */

// Public routes for student registration and login
router.post('/register', register);
router.post('/login', login);

// Protected route to get the logged-in user's profile
router.get('/me', protect, getMe);

module.exports = router;
