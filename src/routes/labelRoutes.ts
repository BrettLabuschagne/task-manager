import express, { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { createLabel, updateLabel, getLabels } from '../controllers/labelController';

const router: Router = express.Router();

router.post('/', authenticateToken, createLabel);
router.get('/', authenticateToken, getLabels);
router.put('/:id', authenticateToken, updateLabel);

export default router;
