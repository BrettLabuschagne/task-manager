import { Request, Response } from 'express';
import { Status } from '../models/Status';

// Create a new status
const createStatus = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        // Validate input
        if (!name) {
        return res.status(400).json({ error: 'Status name is required' });
        }

        // Create the label
        const status = await Status.create({ name });

        res.status(201).json(status);
    } catch (error) {
        res.status(500).json({ error: 'Error creating Status' });
    }
};

export { createStatus };