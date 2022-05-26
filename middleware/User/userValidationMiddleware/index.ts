import { NextFunction, Request, Response } from 'express';
import userSchema from './userSchema';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validateBody = await userSchema.validateAsync(req.body);
    req.body = validateBody;
    next();
  } catch (error) {
    res.json(error);
    next(error);
  }
};
