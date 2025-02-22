import { Customer } from '../models/Customer';

export const makePaymentService = async (customerId: string, amount: number) => {
  const customer = await Customer.findById(customerId);
  if (!customer) throw new Error('Customer not found');

  customer.outstandingPayment -= amount;
  customer.paymentStatus = customer.outstandingPayment <= 0 ? 'completed' : 'pending';
  await customer.save();

  return customer;
};