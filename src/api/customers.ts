import { Customer } from '../types';
import axiosInstance from './axios';

export const getCustomers = async (): Promise<Customer[]> => {
  const response = await axiosInstance.get('/customers');
  return response.data;
};

export const postCustomer = async (customer: Omit<Customer, 'id'>): Promise<Customer> => {
  const response = await axiosInstance.post('/customers', customer);
  return response.data;
};
