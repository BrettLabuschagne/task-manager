import { Request, Response } from 'express';
import { Task } from '../models/Task';
import { Label } from '../models/Label';
import { User } from '../models/User';
import { Status } from '../models/Status';

// Create a new task
const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, dueDate, priority, userId, statusId, labelIds } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      userId,
      statusId,
    });

    if (labelIds && labelIds.length) {
      const labels = await Label.findAll({ where: { id: labelIds } });
      await task.$set('labels', labels);
    }

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Error creating task' });
  }
};

// Get all tasks
const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll({ include: [User, Status, Label] });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching tasks' });
  }
};

// Get a single task by ID
const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id, { include: [User, Status, Label] });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching task' });
  }
};

// Update a task
const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, priority, userId, statusId, labelIds } = req.body;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await task.update({ title, description, dueDate, priority, userId, statusId });

    if (labelIds && labelIds.length) {
      const labels = await Label.findAll({ where: { id: labelIds } });
      await task.$set('labels', labels);
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Error updating task' });
  }
};

// Delete a task
const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await task.destroy();
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting task' });
  }
};

const setStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { statusId } = req.body;
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await task.update({ statusId });
    res.status(200).json({ message: 'Task status updated successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error setting task status' });
  }
};

const setUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await task.update({ userId });
    res.status(200).json({ message: 'Task user changed successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error setting user in task' });
  }
};




export { createTask, getTasks, getTaskById, updateTask, deleteTask, setStatus, setUser };
