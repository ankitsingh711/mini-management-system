import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { BarChart3, Users, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const customers = useSelector((state: RootState) => state.customers.items);
  const notifications = useSelector((state: RootState) => state.notifications.items);

  const totalOutstanding = customers.reduce((sum, customer) => sum + customer.outstandingAmount, 0);
  const overdueCustomers = customers.filter(customer => 
    customer.paymentStatus === 'overdue'
  ).length;

  const stats = [
    {
      name: 'Total Outstanding',
      value: `$${totalOutstanding.toLocaleString()}`,
      icon: BarChart3,
      change: '+4.75%',
      changeType: 'increase',
    },
    {
      name: 'Total Customers',
      value: customers.length,
      icon: Users,
      change: '+2.02%',
      changeType: 'increase',
    },
    {
      name: 'Overdue Payments',
      value: overdueCustomers,
      icon: AlertCircle,
      change: '-4.25%',
      changeType: 'decrease',
    },
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.name}
                className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
              >
                <dt>
                  <div className="absolute bg-indigo-500 rounded-md p-3">
                    <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                    {item.name}
                  </p>
                </dt>
                <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                  <p className="text-2xl font-semibold text-gray-900">
                    {item.value}
                  </p>
                  <p
                    className={`ml-2 flex items-baseline text-sm font-semibold ${
                      item.changeType === 'increase'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {item.change}
                  </p>
                </dd>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Recent Activity
                </h3>
                <div className="mt-5">
                  <div className="flow-root">
                    <ul className="-mb-8">
                      {notifications.slice(0, 5).map((notification, index) => (
                        <li key={notification.id}>
                          <div className="relative pb-8">
                            {index !== notifications.length - 1 && (
                              <span
                                className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                aria-hidden="true"
                              />
                            )}
                            <div className="relative flex space-x-3">
                              <div>
                                <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                                  <AlertCircle
                                    className="h-5 w-5 text-white"
                                    aria-hidden="true"
                                  />
                                </span>
                              </div>
                              <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                <div>
                                  <p className="text-sm text-gray-500">
                                    {notification.message}
                                  </p>
                                </div>
                                <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                  {new Date(notification.createdAt).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;