import { Router } from 'express';
import { getAllNotes, getNoteById, createNote, updateNote, deleteNoteById } from '../controllers/notes.controller.js';
import authenticate from '../middlewares/authenticate.js';
import handleError from '../utils/errorHandler.js';

const router = Router();

// Middleware to authenticate all routes
router.use(authenticate);

router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNoteById);

router.use((error, req, res, _next) => {
	handleError(error, res);
});

export default router;
