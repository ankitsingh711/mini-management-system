import { makePaymentService } from '../services/paymentService';
import { Request, Response } from 'express';
import {logger} from '../config/logger';

export const makePayment = async (req: Request, res: Response) => {
  const { customerId, amount } = req.body;

  try {
    const result = await makePaymentService(customerId, amount);
    res.status(200).json(result);
  } catch (error: any) {
    logger.error(error.message);
    res.status(400).json({ error: error.message });
  }
};
