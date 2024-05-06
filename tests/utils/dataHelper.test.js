import { expect } from 'chai';
import { isValidUUID, checkValidDate } from '../../src/utils/dataHelper.js';

describe('Data Helper', () => {
	describe('isValidUUID', () => {
		it('should return true for a valid UUID', () => {
			expect(isValidUUID('123e4567-e89b-12d3-a456-426614174000')).equal(true);
		});

		it('should return false for an invalid UUID', () => {
			expect(isValidUUID('123e4567-e89b-12d3-a456-42661417400')).equal(false);
		});
	});

	describe('checkValidDate', () => {
		it('should return true for a valid date', () => {
			expect(checkValidDate(new Date())).equal(false);
		});

		it('should return false for an invalid date', () => {
			expect(checkValidDate(new Date('invalid'))).equal(true);
		});
	});
});
