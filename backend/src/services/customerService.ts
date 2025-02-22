import { Customer } from '../models/Customer';

export const createCustomerService = async (data: any) => {
  const customer = new Customer(data);
  return await customer.save();
};

export const getCustomersService = async () => {
  return await Customer.find();
};