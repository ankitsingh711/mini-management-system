import { Router } from 'express';
import * as paymentController from '../controllers/paymentController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticate, paymentController.recordPayment);

router.get('/', authenticate, paymentController.getPayments);

router.get('/:id', authenticate, paymentController.getPaymentById);

router.post('/make-payment', authenticate, paymentController.makePayment);

export default router;