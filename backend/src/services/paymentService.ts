import ElasticClient from '../config/db';
import { logger } from '../config/logger';

interface Payment {
    customerId: string;
    amount: number;
    status: 'pending' | 'completed';
    timestamp: Date;
}

// Record a new payment
export const recordPayment = async (payment: Payment) => {
    try {
        const result = await ElasticClient.index({
            index: 'payments',
            body: payment,
        });
        return result;
    } catch (error) {
        logger.error('Error recording payment:', error);
        throw error;
    }
};

// Get all payments with filtering options
export const getPayments = async (query: any) => {
    try {
        const result = await ElasticClient.search({
            index: 'payments',
            body: { query: { match_all: {} } },
        });
        return result.hits.hits;
    } catch (error) {
        logger.error('Error fetching payments:', error);
        throw error;
    }
};

// Get a single payment by ID
export const getPaymentById = async (id: string) => {
    try {
        const result = await ElasticClient.get({
            index: 'payments',
            id,
        });
        return result._source;
    } catch (error) {
        logger.error('Error fetching payment by ID:', error);
        throw error;
    }
};

// Make a payment
export const makePayment = async (customerId: string, amount: number) => {
    try {
        const payment: Payment = {
            customerId,
            amount,
            status: 'completed',
            timestamp: new Date(),
        };

        const result = await ElasticClient.index({
            index: 'payments',
            body: payment,
        });

        return { id: result._id, ...payment };
    } catch (error) {
        logger.error('Error making payment:', error);
        throw error;
    }
};
