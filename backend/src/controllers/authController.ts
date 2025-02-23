import { Request, Response } from 'express';
import {registerUserService, loginUserService } from '../services/authService';
import { logger } from '../config/logger';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await registerUserService(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    logger.error(error.message);
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const token = await loginUserService(email);
    res.json({ token });
  } catch (error: any) {
    logger.error(error.message);
    res.status(401).json({ error: error.message });
  }
};