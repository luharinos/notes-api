import BaseError from './BaseError.js';

export default class ResourceNotFoundError extends BaseError {
	constructor(message) {
		super(message);
		this.name = 'ResourceNotFoundError';
		this.message = 'Resource Not Found';
		this.statusCode = 404;
	}
}
