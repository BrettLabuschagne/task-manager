import { Request, Response } from 'express';
import { Label } from '../models/Label';

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

export { createLabel, updateLabel, getLabels };
