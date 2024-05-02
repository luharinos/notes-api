const Note = require('./models/Note');

const notes = [];

module.exports.getAllNotes = (req, res) => {
	try {
		res.json(notes);
	} catch (error) {
		console.error('Error occurred:', error);
		res.sendStatus(500);
	}
};

module.exports.getNoteById = (req, res) => {
	try {
		const note = notes.find((n) => n.id === parseInt(req.params.id, 10));
		if (!note) return res.status(404).send('Note not found.');
		res.json(note);
	} catch (error) {
		console.error('Error occurred:', error);
		res.sendStatus(500);
	}
};

module.exports.createNote = (req, res) => {
	try {
		const { title, description } = req.body;
		if (!title || !description) return res.status(400).send('Title and description are required.');
		const id = notes.length + 1;
		const note = new Note(id, title, description);
		notes.push(note);
		res.status(201).json(note);
	} catch (error) {
		console.error('Error occurred:', error);
		res.sendStatus(500);
	}
};

module.exports.updateNote = (req, res) => {
	try {
		const note = notes.find((n) => n.id === parseInt(req.params.id, 10));
		if (!note) return res.status(404).send('Note not found.');
		const { title, description } = req.body;
		if (!title || !description) return res.status(400).send('Title and description are required.');
		note.title = title;
		note.description = description;
		note.updatedAt = new Date();
		res.json(note);
	} catch (error) {
		console.error('Error occurred:', error);
		res.sendStatus(500);
	}
};

module.exports.deleteNoteById = (req, res) => {
	try {
		const index = notes.findIndex((n) => n.id === parseInt(req.params.id, 10));
		if (index === -1) return res.status(404).send('Note not found.');
		notes.splice(index, 1);
		res.sendStatus(204);
	} catch (error) {
		console.error('Error occurred:', error);
		res.sendStatus(500);
	}
};
