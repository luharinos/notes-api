import { v4 as uuidv4 } from 'uuid';
import Note from '../models/Note.js';
import db from '../dbClient.js';

const { notes: NOTES } = db.data;

function handleError(error, res) {
	console.error('Error occurred:', error);
	res.sendStatus(500);
}

function isValidUUID(uuid) {
	const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
	return uuidRegex.test(uuid);
}

export function getAllNotes(req, res) {
	try {
		// Extract start date and end date from query parameters
		const { startDate, endDate } = req.query;

		// Parse the dates if provided
		const parsedStartDate = startDate ? new Date(startDate) : null;
		const parsedEndDate = endDate ? new Date(endDate) : null;

		if (parsedStartDate && Number.isNaN(parsedStartDate.getTime())) {
			return res.status(400).send('Invalid start date.');
		}
		if (parsedEndDate && Number.isNaN(parsedEndDate.getTime())) {
			return res.status(400).send('Invalid end date.');
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

		// Return the filtered notes as the response
		res.json(filteredNotes);
	} catch (error) {
		handleError(error, res);
	}
}

export function getNoteById(req, res) {
	try {
		// validate the request
		const { id } = req.params;
		if (!isValidUUID(id)) return res.status(400).send('Invalid note ID.');

		// find the note by id
		const note = NOTES.find((n) => n.id === id);

		// if note not found, return 404
		if (!note) return res.status(404).send('Note not found.');

		// return the note
		res.json(note);
	} catch (error) {
		handleError(error, res);
	}
}

export function createNote(req, res) {
	try {
		// validate the request
		const { title, description } = req.body;
		if (!title || !description) return res.status(400).send('Title and description are required.');

		// check if a note with the same title and description already exists
		const existingNote = NOTES.find((note) => note.title === title && note.description === description);
		if (existingNote) {
			return res.status(409).send('A note with the same title and description already exists.');
		}

		// create a new note
		const id = uuidv4();
		const note = new Note(id, title, description);

		// add the note to the database
		db.update(({ notes }) => notes.push(note));

		// return the note
		res.status(201).json(note);
	} catch (error) {
		handleError(error, res);
	}
}

export function updateNote(req, res) {
	try {
		// validate the request
		const { id } = req.params;
		if (!isValidUUID(id)) return res.status(400).send('Invalid note ID.');
		const { title, description } = req.body;
		if (!title || !description) return res.status(400).send('Title and description are required.');

		// find the note by id
		const noteIndex = NOTES.findIndex((n) => n.id === id);
		if (noteIndex === -1) return res.status(404).send('Note not found.');

		// update the note
		const updatedNote = { ...NOTES[noteIndex], title, description, updatedAt: new Date() };
		db.update(({ notes }) => {
			notes[noteIndex] = updatedNote;
		});

		// return the updated note
		res.json(updatedNote);
	} catch (error) {
		handleError(error, res);
	}
}

export function deleteNoteById(req, res) {
	try {
		// validate the request
		const { id } = req.params;
		if (!isValidUUID(id)) return res.status(400).send('Invalid note ID.');

		// find the index of the note by id
		const noteIndex = NOTES.findIndex((n) => n.id === id);
		if (noteIndex === -1) return res.status(404).send('Note not found.');

		// delete the note
		db.update(({ notes }) => notes.splice(noteIndex, 1));

		// return 204
		res.status(204).end();
	} catch (error) {
		handleError(error, res);
	}
}
