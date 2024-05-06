import BaseError from './BaseError.js';

export default class BadRequestError extends BaseError {
	constructor(message) {
		super(message);
		this.name = 'BadRequestError';
		this.message = 'Bad Request';
		this.statusCode = 400;
	}
}
