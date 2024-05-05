import { v4 as uuidv4 } from 'uuid';
import Note from './models/Note.js';
import db from './dbClient.js';

const { notes: NOTES } = db.data;

function handleError(error, res) {
	console.error('Error occurred:', error);
	res.sendStatus(500);
}

export function getAllNotes(req, res) {
	try {
		// return all notes
		res.json(NOTES);
	} catch (error) {
		handleError(error, res);
	}
}

export function getNoteById(req, res) {
	try {
		// find the note by id
		const note = NOTES.find((n) => n.id === parseInt(req.params.id, 10));

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

		// create a new note
		const id = NOTES.length + 1;
		const note = new Note(id, title, description);

		// add the note to the database
		// db.read();
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
		const { title, description } = req.body;
		if (!title || !description) return res.status(400).send('Title and description are required.');

		// find the note by id
		const noteIndex = NOTES.findIndex((n) => n.id === parseInt(id, 10));
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
		const { id } = req.params;
		const noteIndex = NOTES.findIndex((n) => n.id === parseInt(id, 10));
		if (noteIndex === -1) return res.status(404).send('Note not found.');

		// delete the note
		db.update(({ notes }) => notes.splice(noteIndex, 1));

		// return 204
		res.status(204).end();
	} catch (error) {
		handleError(error, res);
	}
}
