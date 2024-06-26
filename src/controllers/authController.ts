import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ email, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Email already exists' });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(400).json({ error: 'Invalid password' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });

  res.json({ token });
};

export { register, login };
