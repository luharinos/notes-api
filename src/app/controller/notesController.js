import { v4 as uuidv4 } from 'uuid';
import Note from '../models/Note.js';
import db from '../dbClient.js';
import { checkValidDate, isValidUUID } from '../utils/helper.js';

// Import custom error classes
import BadRequestError from '../utils/exceptions/BadRequestError.js';
import ResourceNotFoundError from '../utils/exceptions/ResourceNotFoundError.js';
import ResourceConflictError from '../utils/exceptions/ResourceConflictError.js';

const { notes: NOTES } = db.data;

export function getAllNotes(req, res) {
	// Extract start date and end date from query parameters
	const { startDate, endDate } = req.query;

	// Parse the dates if provided
	const parsedStartDate = startDate ? new Date(startDate) : null;
	const parsedEndDate = endDate ? new Date(endDate) : null;

	if (checkValidDate(parsedStartDate) || checkValidDate(parsedEndDate)) {
		throw new BadRequestError('Invalid start or end date.');
	}

	// Filter notes based on the date range
	const filteredNotes = NOTES.filter((note) => {
		// Check if the note's createdAt date falls within the specified range
		if (parsedStartDate && new Date(note.createdAt) < parsedStartDate) {
			return false; // Note created before start date, exclude it
		}
		if (parsedEndDate && new Date(note.createdAt) > parsedEndDate) {
			return false; // Note created after end date, exclude it
		}
		return true; // Note falls within the date range, include it
	});

	if (filteredNotes.length === 0) {
		throw new ResourceNotFoundError('Note(s) not found.');
	}

	// Return the filtered notes as the response
	res.json(filteredNotes);
}

export function getNoteById(req, res) {
	// validate the request
	const { id } = req.params;

	if (!isValidUUID(id)) throw new BadRequestError('Invalid note ID.');
	// return res.status(400).send('Invalid note ID.');

	// find the note by id
	const note = NOTES.find((n) => n.id === id);

	// if note not found, return 404
	if (!note) throw new ResourceNotFoundError('Note not found.');

	// return the note
	res.json(note);
}

export function createNote(req, res) {
	// validate the request
	const { title, description } = req.body;
	if (!title || !description) throw new BadRequestError('Title and description are required.');

	// check if a note with the same title and description already exists
	const existingNote = NOTES.find((note) => note.title === title && note.description === description);
	if (existingNote) {
		throw new ResourceConflictError('A note with the same title and description already exists.');
	}

	// create a new note
	const id = uuidv4();
	const note = new Note(id, title, description);

	// add the note to the database
	db.update(({ notes }) => notes.push(note));

	// return the note
	res.status(201).json(note);
}

export function updateNote(req, res) {
	// validate the request
	const { id } = req.params;
	if (!isValidUUID(id)) throw new BadRequestError('Invalid note ID.');
	const { title, description } = req.body;
	if (!title || !description) throw new BadRequestError('Title and description are required.');

	// find the note by id
	const noteIndex = NOTES.findIndex((n) => n.id === id);
	if (noteIndex === -1) throw new ResourceNotFoundError('Note not found.');

	// update the note
	const updatedNote = { ...NOTES[noteIndex], title, description, updatedAt: new Date() };
	db.update(({ notes }) => {
		notes[noteIndex] = updatedNote;
	});

	// return the updated note
	res.json(updatedNote);
}

export function deleteNoteById(req, res) {
	// validate the request
	const { id } = req.params;
	if (!isValidUUID(id)) throw new BadRequestError('Invalid note ID.');

	// find the index of the note by id
	const noteIndex = NOTES.findIndex((n) => n.id === id);
	if (noteIndex === -1) throw new ResourceNotFoundError('Note not found.');

	// delete the note
	db.update(({ notes }) => notes.splice(noteIndex, 1));

	// return 204
	res.status(204).end();
}
