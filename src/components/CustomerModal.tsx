import React from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { Customer } from '../types';

interface CustomerModalProps {
  customer?: Customer | null;
  onClose: () => void;
}

interface CustomerForm {
  name: string;
  email: string;
  phone: string;
  outstandingAmount: number;
  dueDate: string;
}

const CustomerModal: React.FC<CustomerModalProps> = ({ customer, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerForm>({
    defaultValues: customer
      ? {
          ...customer,
          dueDate: customer.dueDate.split('T')[0],
        }
      : undefined,
  });

  const onSubmit = async (data: CustomerForm) => {
    try {
      // TODO: Implement API call
      console.log('Form data:', data);
      onClose();
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {customer ? 'Edit Customer' : 'Add Customer'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              {...register('phone', { required: 'Phone is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Outstanding Amount
            </label>
            <input
              type="number"
              step="0.01"
              {...register('outstandingAmount', {
                required: 'Amount is required',
                min: { value: 0, message: 'Amount must be positive' },
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.outstandingAmount && (
              <p className="mt-1 text-sm text-red-600">
                {errors.outstandingAmount.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              {...register('dueDate', { required: 'Due date is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.dueDate && (
              <p className="mt-1 text-sm text-red-600">{errors.dueDate.message}</p>
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              {customer ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerModal;