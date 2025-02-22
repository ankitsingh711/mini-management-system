import express from 'express';
import { getCustomers, createCustomer } from '../controllers/customerController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authenticate, getCustomers);
router.post('/', authenticate, createCustomer);

export default router;