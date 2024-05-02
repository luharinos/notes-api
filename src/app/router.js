const { Router } = require('express');
const { getAllNotes, getNoteById, createNote, updateNote, deleteNoteById } = require('./controller');

const routes = Router();

routes.get('/', getAllNotes);
routes.get('/:id', getNoteById);
routes.post('/', createNote);
routes.put('/:id', updateNote);
routes.delete('/:id', deleteNoteById);

module.exports = routes;
