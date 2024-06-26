import { Request, Response, NextFunction } from 'express';
import { validationResult, body } from 'express-validator';

export const validateCreateUser = [
  body('username').isString().notEmpty(),
  body('email').isEmail(),
  body('password').isString().isLength({ min: 6 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];


export const validateLogin = [
    body('email').isString().notEmpty().isEmail(),
    body('password').isString().isLength({ min: 6 }),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: 'Invalid Login Details' });
        }
        next();
    },
];
