import BaseError from './BaseError.js';

export default class UnauthorisedError extends BaseError {
	constructor(message) {
		super(message);
		this.name = 'UnauthorisedError';
		this.message = 'Unauthorised Access';
		this.statusCode = 401;
	}
}
