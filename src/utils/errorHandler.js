import BaseError from '../exceptions/BaseError.js';

export default function handleError(error, res) {
	if (error instanceof BaseError) {
		const { statusCode } = error;
		const response = error.getResponse();
		return res.status(statusCode).json(response);
	}
	console.error(error);
	const msg = new BaseError('An unexpected error occurred. Please try again later.');
	res.json(msg.getResponse());
}
