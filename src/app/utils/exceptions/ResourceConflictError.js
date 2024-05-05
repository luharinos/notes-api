import BaseError from './BaseError.js';

export default class ResourceConflictError extends BaseError {
	constructor(message) {
		super(message);
		this.name = 'ResourceConflictError';
		this.message = 'Resource Already Exists';
		this.statusCode = 409;
	}
}
