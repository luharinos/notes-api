import Note from '../../src/models/Note.js';
import { expect } from 'chai';

describe('Note Model', () => {
	describe('Note', () => {
		it('should create a new note object with the provided values', () => {
			const note = new Note('123e4567-e89b-12d3-a456-426614174000', 'Test Note', 'This is a test note');

			expect(note).to.be.an('object');
			expect(note).to.be.an.instanceOf(Note);
			expect(note).to.have.property('id').to.be.a('string');
			expect(note).to.have.property('title').to.be.a('string').to.equal('Test Note');
			expect(note).to.have.property('description').to.be.a('string').to.equal('This is a test note');
			expect(note).to.have.property('createdAt').to.be.a('Date');
			expect(note).to.have.property('updatedAt').to.be.a('Date');
		});
	});
});
