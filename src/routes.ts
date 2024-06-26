import express from 'express';
import { register, login } from './controllers/authController';
import taskRouter from './routes/taskRoutes'
import labelRouter from './routes/labelRoutes'
import statusRouter from './routes/statusRoutes'

import { validateCreateUser, validateLogin } from './middleware/validationMiddleware';

const router = express.Router();

router.post('/register', validateCreateUser, register);
router.post('/login', validateLogin, login);

router.use('/tasks', taskRouter);
router.use('/labels', labelRouter);
router.use('/statuses', statusRouter);

export default router;
