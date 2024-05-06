import app from '../../src/app.js';
import supertest from 'supertest';
import { expect } from 'chai';

const request = supertest(app);

const headers = {
	'x-api-key': 'test-api-key'
};

describe('Request Validation', () => {
	describe('GET /api/notes', () => {
		describe('start date greater than or equal to end date', () => {
			it('should give invalid dates', async () => {
				const response = await request.get('/api/notes?startDate=2021-01-01&endDate=2020-01-01').set(headers);

				expect(response.status).to.equal(400);
				expect(response.body).to.have.property('status').to.be.a('string').to.equal('error');
				expect(response.body).to.have.property('message').to.be.a('string').to.equal('Bad Request');
				expect(response.body)
					.to.have.property('description')
					.to.be.a('string')
					.to.equal('Invalid start or end date.');
			});
		});

		describe('start date is an invalid value', () => {
			it('should give invalid dates', async () => {
				const response = await request.get('/api/notes?startDate=abcd&endDate=2020-01-01').set(headers);

				expect(response.status).to.equal(400);
				expect(response.body).to.have.property('status').to.be.a('string').to.equal('error');
				expect(response.body).to.have.property('message').to.be.a('string').to.equal('Bad Request');
				expect(response.body)
					.to.have.property('description')
					.to.be.a('string')
					.to.equal('Invalid start or end date.');
			});
		});

		describe('end date is an invalid value', () => {
			it('should give invalid dates', async () => {
				const response = await request.get('/api/notes?startDate=2020-01-01&endDate=abcd').set(headers);

				expect(response.status).to.equal(400);
				expect(response.body).to.have.property('status').to.be.a('string').to.equal('error');
				expect(response.body).to.have.property('message').to.be.a('string').to.equal('Bad Request');
				expect(response.body)
					.to.have.property('description')
					.to.be.a('string')
					.to.equal('Invalid start or end date.');
			});
		});
	});

	describe('GET /api/notes/:id', () => {
		describe('invalid note ID', () => {
			it('should give invalid note ID', async () => {
				const response = await request.get('/api/notes/abcd').set(headers);

				expect(response.status).to.equal(400);
				expect(response.body).to.have.property('status').to.be.a('string').to.equal('error');
				expect(response.body).to.have.property('message').to.be.a('string').to.equal('Bad Request');
				expect(response.body).to.have.property('description').to.be.a('string').to.equal('Invalid note ID.');
			});
		});

		describe('note not found', () => {
			it('should give note not found', async () => {
				const response = await request.get('/api/notes/123e4567-e89b-12d3-a456-426614174000').set(headers);

				expect(response.status).to.equal(404);
				expect(response.body).to.have.property('status').to.be.a('string').to.equal('error');
				expect(response.body).to.have.property('message').to.be.a('string').to.equal('Resource Not Found');
				expect(response.body).to.have.property('description').to.be.a('string').to.equal('Note not found.');
			});
		});
	});

	describe('POST /api/notes', () => {
		describe('title and description are missing', () => {
			it('should give title and description are required', async () => {
				const response = await request.post('/api/notes').set(headers);

				expect(response.status).to.equal(400);
				expect(response.body).to.have.property('status').to.be.a('string').to.equal('error');
				expect(response.body).to.have.property('message').to.be.a('string').to.equal('Bad Request');
				expect(response.body)
					.to.have.property('description')
					.to.be.a('string')
					.to.equal('Title and description are required.');
			});
		});

		describe('title and description already exist', () => {
			it('should give a note with the same title and description already exists', async () => {
				await request.post('/api/notes').send({ title: 'Test Note 3', description: 'This is a test note 3.' }).set(headers);
				const response = await request
					.post('/api/notes')
					.send({ title: 'Test Note 3', description: 'This is a test note 3.' })
					.set(headers);

				expect(response.status).to.equal(409);
				expect(response.body).to.have.property('status').to.be.a('string').to.equal('error');
				expect(response.body).to.have.property('message').to.be.a('string').to.equal('Resource Already Exists');
				expect(response.body)
					.to.have.property('description')
					.to.be.a('string')
					.to.equal('A note with the same title and description already exists.');
			});
		});
	});

	describe('PUT /api/notes/:id', () => {
		describe('invalid note ID', () => {
			it('should give invalid note ID', async () => {
				const response = await request.put('/api/notes/abcd').set(headers);

				expect(response.status).to.equal(400);
				expect(response.body).to.have.property('status').to.be.a('string').to.equal('error');
				expect(response.body).to.have.property('message').to.be.a('string').to.equal('Bad Request');
				expect(response.body).to.have.property('description').to.be.a('string').to.equal('Invalid note ID.');
			});
		});

		describe('note not found', () => {
			it('should give note not found', async () => {
				const response = await request
					.put('/api/notes/123e4567-e89b-12d3-a456-426614174000')
					.send({ title: 'Note 1', description: 'Description 1' })
					.set(headers);

				expect(response.status).to.equal(404);
				expect(response.body).to.have.property('status').to.be.a('string').to.equal('error');
				expect(response.body).to.have.property('message').to.be.a('string').to.equal('Resource Not Found');
				expect(response.body).to.have.property('description').to.be.a('string').to.equal('Note not found.');
			});
		});

		describe('title and description are missing', () => {
			it('should give title and description are required', async () => {
				const response = await request.put('/api/notes/123e4567-e89b-12d3-a456-426614174000').set(headers);

				expect(response.status).to.equal(400);
				expect(response.body).to.have.property('status').to.be.a('string').to.equal('error');
				expect(response.body).to.have.property('message').to.be.a('string').to.equal('Bad Request');
				expect(response.body)
					.to.have.property('description')
					.to.be.a('string')
					.to.equal('Title and description are required.');
			});
		});
	});

	describe('DELETE /api/notes/:id', () => {
		describe('invalid note ID', () => {
			it('should give invalid note ID', async () => {
				const response = await request.delete('/api/notes/abcd').set(headers);

				expect(response.status).to.equal(400);
				expect(response.body).to.have.property('status').to.be.a('string').to.equal('error');
				expect(response.body).to.have.property('message').to.be.a('string').to.equal('Bad Request');
				expect(response.body).to.have.property('description').to.be.a('string').to.equal('Invalid note ID.');
			});
		});

		describe('note not found', () => {
			it('should give note not found', async () => {
				const response = await request.delete('/api/notes/123e4567-e89b-12d3-a456-426614174000').set(headers);

				expect(response.status).to.equal(404);
				expect(response.body).to.have.property('status').to.be.a('string').to.equal('error');
				expect(response.body).to.have.property('message').to.be.a('string').to.equal('Resource Not Found');
				expect(response.body).to.have.property('description').to.be.a('string').to.equal('Note not found.');
			});
		});
	});
});
