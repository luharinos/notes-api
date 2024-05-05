import { Router } from 'express';
import { getAllNotes, getNoteById, createNote, updateNote, deleteNoteById } from '../controller/notesController.js';

const router = Router();

router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNoteById);

export default router;
