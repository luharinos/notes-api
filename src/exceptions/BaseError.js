export default class BaseError extends Error {
	constructor(message) {
		super(message);
		this.name = 'ServerError';
		this.message = 'Internal Server Error';
		this.description = message;
		this.statusCode = 500;
	}

	getResponse() {
		return {
			status: 'error',
			message: this.message,
			description: this.description
		};
	}
}
