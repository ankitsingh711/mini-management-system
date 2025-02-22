import { Request, Response } from 'express';
import {registerUserService, loginUserService } from '../services/authService';
import { logger } from '../config/logger';

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const user = await registerUserService(name, email, password);
    res.status(201).json(user);
  } catch (error: any) {
    logger.error(error.message);
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await loginUserService(email, password);
    res.json({ token });
  } catch (error: any) {
    logger.error(error.message);
    res.status(401).json({ error: error.message });
  }
};