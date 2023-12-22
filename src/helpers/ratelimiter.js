const rateLimit = require('express-rate-limit');

// Example: createRateLimiter(15, 1000) will limit to 1000 requests per 15 minutes
const createRateLimiter = (minutes, maxRequests) =>
	rateLimit({
		windowMs: minutes * 60 * 1000, // minutes to milliseconds
		max: maxRequests, // limit each IP to maxRequests requests per windowMs
		message: 'Too many requests from this IP, please try again later',
		validate: { trustProxy: false },
	});

const defaultRateLimit = createRateLimiter(15, 1000);

module.exports = { createRateLimiter, defaultRateLimit };
