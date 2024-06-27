import { Request, Response } from 'express';
import { Task } from '../models/Task';
import { Label } from '../models/Label';
import { User } from '../models/User';
import { Status } from '../models/Status';
import { Op } from 'sequelize';

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

// Get all tasks which allows for filter and sorting
const getTasks = async (req: Request, res: Response) => {
  const { status, priority, dueDate, sortField, sortOrder } = req.query;

  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  const userId = req.user.id;

  const filterConditions: any = { userId };
  if (status) {
    filterConditions.status = status;
  }
  if (priority) {
    filterConditions.priority = priority;
  }
  if (dueDate) {
    filterConditions.dueDate = {
      [Op.lte]: new Date(dueDate as string),
    };
  }

  const order: any[] = [];
  if (sortField && sortOrder) {
    order.push([sortField as string, sortOrder as string]);
  }

  try {
    const tasks = await Task.findAll({
      where: filterConditions,
      order: order.length ? order : undefined,
    });

    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get a single task by ID
const getTaskById = async (req: Request, res: Response) => {

  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  const userId = req.user.id;


  try {
    const { id } = req.params;
    const task = await Task.findByPk(id, { include: [User, Status, Label] });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized to view this task' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching task' });
  }
};

// Update a task
const updateTask = async (req: Request, res: Response) => {

  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  const userId = req.user.id;

  try {
    const { id } = req.params;
    const { title, description, dueDate, priority, userId, statusId, labelIds } = req.body;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized to view this task' });
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
