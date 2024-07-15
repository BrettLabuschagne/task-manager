import express, { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { createLabel, updateLabel, getLabels, addLabelToTask, removeLabelFromTask } from '../controllers/labelController';

const router: Router = express.Router();

router.post('/', authenticateToken, createLabel);
router.get('/', authenticateToken, getLabels);
router.put('/:id', authenticateToken, updateLabel);
router.post('/add-to-task', addLabelToTask);
router.post('/remove-from-task', removeLabelFromTask);


export default router;
