import UnauthorizedError from '../exceptions/UnauthorisedError.js';

export default function validateApiKey(req, res, next) {
	// Check if the API key is provided in the request headers
	const apiKey = req.headers['x-api-key'];
	if (!apiKey) {
		throw new UnauthorizedError('API key is required');
	}

	// Check if the provided API key is valid (e.g., stored in a database)
	if (apiKey !== 'test-api-key') {
		throw new UnauthorizedError('Invalid API key');
	}

	// API key is valid, proceed to the next middleware
	next();
}
