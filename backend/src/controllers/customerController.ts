import { Request, Response } from 'express';
import {addCustomerService, getCustomersService } from '../services/customerService';
import {logger} from '../config/logger';

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await getCustomersService();
    res.json(customers);
  } catch (error: any) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await addCustomerService(req.body);
    res.status(201).json(customer);
  } catch (error: any) {
    logger.error(error.message);
    res.status(400).json({ error: error.message });
  }
};