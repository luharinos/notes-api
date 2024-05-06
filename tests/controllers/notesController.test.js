// import chai from 'chai';
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../src/app.js';

const request = supertest(app);

const headers = {
	'x-api-key': 'test-api-key'
};

describe('User Journeys', () => {
	describe('initial read with existing db records', () => {
		it('should give resource not found', async () => {
			const response = await request.get('/api/notes').set(headers);
			expect(response.body).to.be.an('array').of.length.greaterThanOrEqual(1);
			expect(response.body[0]).to.have.property('id').to.be.a('string');
			expect(response.body[0]).to.have.property('title').to.be.a('string');
			expect(response.body[0]).to.have.property('description').to.be.a('string');
			expect(response.body[0]).to.have.property('createdAt').to.be.a('string');
			expect(response.body[0]).to.have.property('updatedAt').to.be.a('string');

			// expect(response.body).to.have.property('status').to.be.a('string');
			// expect(response.body).to.have.property('message').to.be.a('string');
			// expect(response.body).to.have.property('description').to.be.a('string');
			// expect(response.body).to.have.property('status').to.equal('error');
			// expect(response.body).to.have.property('message').to.equal('Resource Not Found');
			// expect(response.body).to.have.property('description').to.equal('Note(s) not found.');
		});
	});

	describe('create a new note and read by id', () => {
		it('should create a new note', async () => {
			const newNote = {
				title: 'Test Note 1',
				description: 'This is a test note 1.'
			};

			const createResponse = await request.post('/api/notes').set(headers).send(newNote);

			expect(createResponse.body).to.have.property('id').to.be.a('string');
			expect(createResponse.body).to.have.property('title').to.be.a('string').to.equal(newNote.title);
			expect(createResponse.body).to.have.property('description').to.be.a('string').to.equal(newNote.description);
			expect(createResponse.body).to.have.property('createdAt').to.be.a('string');
			expect(createResponse.body).to.have.property('updatedAt').to.be.a('string');

			const readResponse = await request.get(`/api/notes/${createResponse.body.id}`).set(headers);

			expect(readResponse.body).to.be.an('object');
			expect(readResponse.body).to.have.property('id').to.be.a('string');
			expect(readResponse.body).to.have.property('title').to.be.a('string').to.equal(newNote.title);
			expect(readResponse.body).to.have.property('description').to.be.a('string').to.equal(newNote.description);
			expect(createResponse.body).to.have.property('createdAt').to.be.a('string');
			expect(createResponse.body).to.have.property('updatedAt').to.be.a('string');
		});
	});

	describe('create a new note and update by id', () => {
		it('should update an existing note', async () => {
			const newNote = {
				title: 'Test Note 2',
				description: 'This is a test note 2.'
			};

			const createResponse = await request.post('/api/notes').set(headers).send(newNote);
			expect(createResponse.body).to.have.property('id').to.be.a('string');
			expect(createResponse.body).to.have.property('title').to.be.a('string').to.equal(newNote.title);
			expect(createResponse.body).to.have.property('description').to.be.a('string').to.equal(newNote.description);
			expect(createResponse.body).to.have.property('createdAt').to.be.a('string');
			expect(createResponse.body).to.have.property('updatedAt').to.be.a('string');

			const updateNote = {
				title: 'Updated Test Note 2',
				description: 'This is an updated test note 2.'
			};

			const updateResponse = await request
				.put(`/api/notes/${createResponse.body.id}`)
				.set(headers)
				.send(updateNote);
			expect(updateResponse.body).to.be.an('object');
			expect(updateResponse.body).to.have.property('id').to.be.a('string').to.equal(createResponse.body.id);
			expect(updateResponse.body).to.have.property('title').to.be.a('string').to.equal(updateNote.title);
			expect(updateResponse.body)
				.to.have.property('description')
				.to.be.a('string')
				.to.equal(updateNote.description);
			expect(createResponse.body).to.have.property('createdAt').to.be.a('string');
			expect(createResponse.body).to.have.property('updatedAt').to.be.a('string');
		});
	});

	describe('create a new note and delete by id', () => {
		it('should delete an existing note', async () => {
			let number = Math.ceil(Math.random() * 10);
			if (number === 3) number = Math.ceil(Math.random() * 10);
			const newNote = {
				title: `Test Note ${number}`,
				description: `This is a test note ${number}.`
			};

			const createResponse = await request.post('/api/notes').set(headers).send(newNote);
			expect(createResponse.body).to.have.property('id').to.be.a('string');
			expect(createResponse.body).to.have.property('title').to.be.a('string').to.equal(newNote.title);
			expect(createResponse.body).to.have.property('description').to.be.a('string').to.equal(newNote.description);
			expect(createResponse.body).to.have.property('createdAt').to.be.a('string');
			expect(createResponse.body).to.have.property('updatedAt').to.be.a('string');

			const deleteResponse = await request.delete(`/api/notes/${createResponse.body.id}`).set(headers);
			expect(deleteResponse.status).to.equal(204);

			const readResponse = await request.get(`/api/notes/${createResponse.body.id}`).set(headers);
			expect(readResponse.body).to.have.property('status').to.be.a('string').to.equal('error');
			expect(readResponse.body).to.have.property('message').to.be.a('string').to.equal('Resource Not Found');
			expect(readResponse.body).to.have.property('description').to.be.a('string').to.equal('Note not found.');
		});
	});

	describe('delete all notes and read all', () => {
		it('should delete all notes', async () => {
			const initialReadResponse = await request.get('/api/notes').set(headers);
			expect(initialReadResponse.body).to.be.an('array').of.length.greaterThanOrEqual(1);
			expect(initialReadResponse.body[0]).to.have.property('id').to.be.a('string');
			expect(initialReadResponse.body[0]).to.have.property('title').to.be.a('string');
			expect(initialReadResponse.body[0]).to.have.property('description').to.be.a('string');
			expect(initialReadResponse.body[0]).to.have.property('createdAt').to.be.a('string');
			expect(initialReadResponse.body[0]).to.have.property('updatedAt').to.be.a('string');

			const deleteResponse = await Promise.allSettled(
				initialReadResponse.body.map((note) => {
					return new Promise((resolve, reject) => {
						request
							.delete(`/api/notes/${note.id}`)
							.set(headers)
							.then((response) => {
								expect(response.status).to.equal(204);
								resolve(response);
							});
					});
				})
			);

			const finalReadResponse = await request.get('/api/notes').set(headers);
			expect(finalReadResponse.body).to.have.property('status').to.be.a('string').to.equal('error');
			expect(finalReadResponse.body).to.have.property('message').to.be.a('string').to.equal('Resource Not Found');
			expect(finalReadResponse.body)
				.to.have.property('description')
				.to.be.a('string')
				.to.equal('Note(s) not found.');
		});
	});
});
