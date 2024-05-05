import { Router } from 'express';
import { getAllNotes, getNoteById, createNote, updateNote, deleteNoteById } from '../controller/notesController.js';
import handleError from '../utils/errorHandler.js';

const router = Router();

router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNoteById);

router.use((error, req, res, next) => {
	handleError(error, res);
});

export default router;
