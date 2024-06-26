import express, { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { createStatus } from '../controllers/statusController';

const router: Router = express.Router();

router.post('/', authenticateToken, createStatus);

export default router;
