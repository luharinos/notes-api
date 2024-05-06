import { expect } from 'chai';
import db from '../../src/utils/dbClient.js';

describe('DB Client', () => {
	describe('data', () => {
		it('should have a notes array', () => {
			const result = db.data;
			expect(result).to.have.property('notes').to.be.an('array');
		});
	});
});
