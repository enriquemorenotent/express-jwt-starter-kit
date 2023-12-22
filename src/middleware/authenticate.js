const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY } = process.env;

const NO_ENV_VARIABLES_ERROR =
	'JWT_SECRET or REFRESH_TOKEN_SECRET is not set in the environment';
const NO_REFRESH_TOKEN_ERROR = 'No refresh token provided';
const INVALID_REFRESH_TOKEN_ERROR = 'Invalid refresh token';
const NO_USER_ERROR = 'User not found';

const checkEnvVariables = () => {
	if (!JWT_SECRET || !REFRESH_TOKEN_SECRET)
		throw new Error(NO_ENV_VARIABLES_ERROR);
};

const generateAccessToken = (userId) =>
	jwt.sign({ userId }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });

const verifyToken = (token, secret) => {
	try {
		return jwt.verify(token, secret);
	} catch (error) {
		return null;
	}
};

const refreshTokenIfNeeded = async (req, res, decoded) => {
	if (decoded) return decoded;

	const refreshToken = req.cookies.refreshToken;

	if (!refreshToken) throw new Error(NO_REFRESH_TOKEN_ERROR);

	const decodedRefreshToken = verifyToken(refreshToken, REFRESH_TOKEN_SECRET);

	if (!decodedRefreshToken) throw new Error(INVALID_REFRESH_TOKEN_ERROR);

	const newAccessToken = generateAccessToken(decodedRefreshToken.userId);

	res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: true });

	return verifyToken(newAccessToken, JWT_SECRET);
};

const findAuthenticatedUser = async (userId) => {
	const user = await User.findByPk(userId);
	if (!user) throw new Error(NO_USER_ERROR);
	return user;
};

const authenticate = async (req, res, next) => {
	try {
		checkEnvVariables();
		const accessToken = req.cookies.accessToken;

		let decoded = verifyToken(accessToken, JWT_SECRET);

		decoded = await refreshTokenIfNeeded(req, res, decoded);
		req.user = await findAuthenticatedUser(decoded.userId);

		next();
	} catch (error) {
		console.error('Authentication error:', error.message);
		res.status(401).send('Unauthorized');
	}
};

module.exports = authenticate;
