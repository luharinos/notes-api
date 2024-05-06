import app from '../src/app.js';
import supertest from 'supertest';
import { expect } from 'chai';

const request = supertest(app);

describe('Server Health Check', () => {
	describe('GET /health', () => {
		it('should give 200 OK', async () => {
			const response = await request.get('/health');

			expect(response.status).to.equal(200);
			expect(response.text).to.be.a('string').to.equal('OK');
		});
	});
});
