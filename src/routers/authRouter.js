const express = require('express');
const { createRateLimiter } = require('../helpers/ratelimiter');
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const authenticate = require('../middleware/authenticate');

const { login, register, logout, me } = authController;

const router = express.Router();

// Rate limiters

const loginLimit = createRateLimiter(15, 100);
const registerLimit = createRateLimiter(15, 100);
const meLimit = createRateLimiter(15, 100);

// Validators

const loginValidators = [
	check('email').isEmail(),
	check('password').isLength({ min: 5 }),
];

const registerValidators = [
	check('email').isEmail().normalizeEmail(),
	check('password').isLength({ min: 5 }).trim().escape(),
];

// Route handlers

router.post('/login', loginLimit, loginValidators, login);
router.post('/logout', logout);
router.post('/register', registerLimit, registerValidators, register);
router.get('/me', meLimit, authenticate, me);

module.exports = router;
