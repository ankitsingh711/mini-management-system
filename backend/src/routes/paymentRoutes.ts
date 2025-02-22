import express from 'express';
import { makePayment } from '../controllers/paymentController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/pay', authenticate, makePayment);

export default router;