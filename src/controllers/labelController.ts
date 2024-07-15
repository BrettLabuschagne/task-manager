import { Request, Response } from 'express';
import { Label } from '../models/Label';
import { Task } from '../models/Task';

// Create a new label
const createLabel = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    // Validate input
    if (!name) {
      return res.status(400).json({ error: 'Label name is required' });
    }

    // Create the label
    const label = await Label.create({ name });

    res.status(201).json(label);
  } catch (error) {
    res.status(500).json({ error: 'Error creating label' });
  }
};

// Update an existing label
const updateLabel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Validate input
    if (!name) {
      return res.status(400).json({ error: 'Label name is required' });
    }

    // Find the label by ID
    const label = await Label.findByPk(id);

    if (!label) {
      return res.status(404).json({ error: 'Label not found' });
    }

    // Update the label
    await label.update({ name });

    res.status(200).json(label);
  } catch (error) {
    res.status(500).json({ error: 'Error updating label' });
  }
};

// Get all labels
const getLabels = async (req: Request, res: Response) => {
  try {
    const labels = await Label.findAll({});
    res.status(200).json(labels);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching labels' });
  }
};


// Add a label to a task
const addLabelToTask = async (req: Request, res: Response) => {
  const { taskId, labelId } = req.body;

  try {
    const task = await Task.findByPk(taskId);
    const label = await Label.findByPk(labelId);

    if (!task || !label) {
      return res.status(404).json({ message: 'Task or Label not found' });
    }

    await task.$add('label', label);
    return res.status(200).json({ message: 'Label added to task successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred', error });
  }
}

// Remove a label from a task
const removeLabelFromTask = async (req: Request, res: Response) => {
  const { taskId, labelId } = req.body;

  try {
    const task = await Task.findByPk(taskId);
    const label = await Label.findByPk(labelId);

    if (!task || !label) {
      return res.status(404).json({ message: 'Task or Label not found' });
    }

    await task.$remove('label', label);
    return res.status(200).json({ message: 'Label removed from task successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred', error });
  }
}


export { createLabel, updateLabel, getLabels, addLabelToTask, removeLabelFromTask };
