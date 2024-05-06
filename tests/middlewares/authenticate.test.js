// import chai from 'chai';
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../src/app.js';

const request = supertest(app);

describe('API Key validation', () => {
	describe('GET /api/notes', () => {
		it('should give 401 Unauthorised', async () => {
			const response = await request.get('/api/notes');

			expect(response.status).to.equal(401);
			expect(response.body).to.have.property('status').to.be.a('string').to.equal('error');
			expect(response.body).to.have.property('message').to.be.a('string').to.equal('Unauthorised Access');
			expect(response.body).to.have.property('description').to.be.a('string').to.equal('API key is required');
		});
	});

	describe('GET /api/notes/:id', () => {
		it('should give 401 Unauthorised', async () => {
			const response = await request.get('/api/notes/1');

			expect(response.status).to.equal(401);
			expect(response.body).to.have.property('status').to.be.a('string').to.equal('error');
			expect(response.body).to.have.property('message').to.be.a('string').to.equal('Unauthorised Access');
			expect(response.body).to.have.property('description').to.be.a('string').to.equal('API key is required');
		});
	});

	describe('POST /api/notes', () => {
		it('should give 401 Unauthorised', async () => {
			const newNote = { title: 'Test Note', description: 'This is a test note' };
			const response = await request.post('/api/notes').send(newNote);

			expect(response.status).to.equal(401);
			expect(response.body).to.have.property('status').to.be.a('string').to.equal('error');
			expect(response.body).to.have.property('message').to.be.a('string').to.equal('Unauthorised Access');
			expect(response.body).to.have.property('description').to.be.a('string').to.equal('API key is required');
		});
	});

	describe('PUT /api/notes/:id', () => {
		it('should give 401 Unauthorised', async () => {
			const updatedNote = { title: 'Updated Note', description: 'This is an updated note' };
			const response = await request.put('/api/notes/1').send(updatedNote);

			expect(response.status).to.equal(401);
			expect(response.body).to.have.property('status').to.be.a('string').to.equal('error');
			expect(response.body).to.have.property('message').to.be.a('string').to.equal('Unauthorised Access');
			expect(response.body).to.have.property('description').to.be.a('string').to.equal('API key is required');
		});
	});

	describe('DELETE /api/notes/:id', () => {
		it('should give 401 Unauthorised', async () => {
			const response = await request.delete('/api/notes/1');

			expect(response.status).to.equal(401);
			expect(response.body).to.have.property('status').to.be.a('string').to.equal('error');
			expect(response.body).to.have.property('message').to.be.a('string').to.equal('Unauthorised Access');
			expect(response.body).to.have.property('description').to.be.a('string').to.equal('API key is required');
		});
	});
});
