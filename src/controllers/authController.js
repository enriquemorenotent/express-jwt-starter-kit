const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Constants

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const AT_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
const RT_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;
const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS);

const COOKIE_OPTIONS = { httpOnly: true, secure: true, sameSite: 'none' };
// Helpers

const encryptPassword = (password) => bcrypt.hashSync(password, SALT_ROUNDS);

const generateAccessToken = (userId) =>
	jwt.sign({ userId }, JWT_SECRET, { expiresIn: AT_EXPIRY });

const generateRefreshToken = (userId) =>
	jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: RT_EXPIRY });

const authenticateUser = async (email, password) => {
	const user = await User.findOne({ where: { email } });
	if (!user) {
		throw new Error('Authentication failed: User not found');
	}

	const passwordMatches = await bcrypt.compare(password, user.password);
	if (!passwordMatches) {
		throw new Error('Authentication failed: Incorrect password');
	}

	return user;
};

const handleSuccess = (res, user) => {
	const accessToken = generateAccessToken(user.id);
	const refreshToken = generateRefreshToken(user.id);

	res.cookie('accessToken', accessToken, COOKIE_OPTIONS);
	res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
	res.send({ user });
};

// Route handlers

exports.login = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() });

	const { email, password } = req.body;
	const user = await authenticateUser(email, password);

	handleSuccess(res, user);
};

exports.register = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() });

	const { password, email } = req.body;
	const user = await User.create({
		email,
		password: encryptPassword(password),
	});

	handleSuccess(res, user);
};

exports.logout = (req, res) => {
	res.clearCookie('accessToken');
	res.clearCookie('refreshToken');
	res.json('Logged out');
};

exports.me = async (req, res) => {
	const { userId } = req;
	const user = await User.findByPk(userId);
	res.json({ user });
};
