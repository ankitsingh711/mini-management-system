import { Request, Response } from 'express';
import { registerUserService, loginUserService } from '../services/authService';
import { logger } from '../config/logger';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { message } = await registerUserService(req.body);
    res.status(201).json({ status: 'success', message });
  } catch (error: any) {
    logger.error(error.message);
    res.status(400).json({ status: 'error', message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { message, token, user } = await loginUserService(email, password);
    if (token) {
      res.status(200).json({ status: 'success', message, token, user });
    } else {
      res.status(401).json({ status: 'error', message });
    }
  } catch (error: any) {
    logger.error(error.message);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};