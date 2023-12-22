const express = require('express'); // Express.js for building the server
const cors = require('cors'); // CORS for handling Cross-Origin Resource Sharing
const cookieParser = require('cookie-parser'); // Cookie-parser for parsing cookies

const authRouter = require('./routers/authRouter');

// Getting the CORS origin from environment variables
const { CORS_ORIGIN } = process.env;

// Initializing the express application
const app = express();

// Trusting the first proxy in case the app is running behind a reverse proxy like Nginx
// It's necessary for secure cookies
app.set('trust proxy', true);

// Using CORS middleware with the origin set to the environment variable, and allowing credentials
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));

// Using express.json middleware to parse JSON requests
app.use(express.json());

// Using cookie-parser middleware to parse cookies
app.use(cookieParser());

// Add authentication router

app.use('/v1/auth', authRouter);

// Defining a dummy root route
app.get('/', (req, res) => {
	res.send('Hello World!');
});

// Error handling middleware. This is set up at the end of the middleware chain
// in case any of the previous middleware functions throw an error
app.use((err, req, res, next) => {
	console.log('Error handler');
	console.error(err.stack); // Logging the stack trace of the error
	res.status(500).send({ error: err.message }); // Sending a 500 status code with the error message
});

// Exporting the express application
module.exports = app;
