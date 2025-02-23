import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Plus, Search } from 'lucide-react';
import { RootState } from '../store';
import { Customer } from '../types';
import { addCustomer, setCustomers } from '../store/slices/customerSlice';
import { addNotification } from '../store/slices/notificationSlice';
import { getCustomers, postCustomer } from '../api/customers';


interface CustomerForm {
  name: string;
  email: string;
  phone: string;
  outstandingAmount: number;
  paymentDueDate: string;
}

const Customers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const customers = useSelector((state: RootState) => state.customers.items);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CustomerForm>();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCustomers();
        dispatch(setCustomers(data));
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchData();
  }, [dispatch]);


  const onSubmit = async (data: CustomerForm) => {
    try {
        const newCustomer: Omit<Customer, 'id'> = {
            ...data,
            paymentStatus: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const savedCustomer = await postCustomer(newCustomer);
        dispatch(addCustomer(savedCustomer));

        dispatch(
            addNotification({
                id: crypto.randomUUID(),
                type: 'success',
                message: `Customer "${data.name}" added successfully`,
                read: false,
                createdAt: new Date().toISOString(),
            })
        );

        setIsModalOpen(false);
        reset();
    } catch (error) {
        console.error('Error adding customer:', error);

        dispatch(
            addNotification({
                id: crypto.randomUUID(),
                type: 'error',
                message: 'Failed to add customer. Please try again.',
                read: false,
                createdAt: new Date().toISOString(),
            })
        );
    }
};

// 🔄 Fetch Customers Notification (Optional)
useEffect(() => {
  const fetchData = async () => {
      try {
          const data = await getCustomers();
          dispatch(setCustomers(data));
      } catch (error) {
          console.error('Error fetching customers:', error);

          dispatch(
              addNotification({
                  id: crypto.randomUUID(),
                  type: 'error',
                  message: 'Failed to load customers. Please refresh.',
                  read: false,
                  createdAt: new Date().toISOString(),
              })
          );
      }
  };

  fetchData();
}, [dispatch]);


  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
          <div className="flex space-x-3">
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <Search className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Customer
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Name</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Phone</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Outstanding Amount</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Due Date</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredCustomers.map((customer) => (
                      <tr key={customer.id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{customer.name}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{customer.email}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{customer.phone}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${customer.outstandingAmount.toLocaleString()}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Date(customer.paymentDueDate).toLocaleDateString()}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            customer.paymentStatus === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : customer.paymentStatus === 'overdue'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {customer.paymentStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-medium mb-4">Add New Customer</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  {...register('phone', { required: 'Phone is required' })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Outstanding Amount</label>
                <input
                  type="number"
                  {...register('outstandingAmount', { required: 'Outstanding Amount is required' })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.outstandingAmount && <p className="mt-1 text-sm text-red-600">{errors.outstandingAmount.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Due Date</label>
                <input
                  type="date"
                  {...register('paymentDueDate', { required: 'Due Date is required' })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.paymentDueDate && <p className="mt-1 text-sm text-red-600">{errors.paymentDueDate.message}</p>}
              </div>

              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="py-2 px-4 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
