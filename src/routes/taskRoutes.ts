import express, { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    setStatus,
    setUser } from '../controllers/taskController';

const router: Router = express.Router();

router.post('/', authenticateToken, createTask);
router.get('/', authenticateToken, getTasks);
router.get('/:id', authenticateToken, getTaskById);
router.put('/:id', authenticateToken, updateTask);
router.delete('/:id', authenticateToken, deleteTask);
router.post('/:id/setStatus', authenticateToken, setStatus);
router.post('/:id/setUser', authenticateToken, setUser);

//get tasks by status
//sort tasks by due date or priority

//add label to task
//remove label from task

export default router;
