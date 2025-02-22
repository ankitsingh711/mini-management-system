import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { deleteCustomer } from '../store/slices/customerSlice';
import { Customer } from '../types';
import { format } from 'date-fns';
import { Edit2, Trash2 } from 'lucide-react';
import CustomerModal from '../components/CustomerModal';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { customers, loading, error } = useSelector((state: RootState) => state.customers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // useEffect(() => {
  //   dispatch(fetchCustomerData());
  // }, [dispatch]);

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleDelete = (customerId: string) => {
    dispatch(deleteCustomer(customerId));
  };

  if (loading) return <div>Loading customers...</div>;
  if (error) return <div>Error loading customers: {error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      {customers.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email/Phone</th>
              <th>Outstanding Amount</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>
                  {customer.email}
                  <br />
                  {customer.phone}
                </td>
                <td>${customer.outstandingAmount.toFixed(2)}</td>
                <td>{format(new Date(customer.dueDate), 'MMM dd, yyyy')}</td>
                <td>
                  <button onClick={() => handleEdit(customer)}>
                    <Edit2 />
                  </button>
                  <button onClick={() => handleDelete(customer.id)}>
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No customers found.</p>
      )}

      {isModalOpen && (
        <CustomerModal
          customer={selectedCustomer}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCustomer(null);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
