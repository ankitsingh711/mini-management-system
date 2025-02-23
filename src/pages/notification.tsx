import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Bell, Check } from 'lucide-react';
import { RootState } from '../store';
import { fetchNotificationsAsync, markAsReadAsync, markAllAsReadAsync } from '../store/slices/notificationSlice';
import useWebSocket from '../hooks/socket';

const Notifications = () => {
  const userId = useSelector((state: RootState) => state.auth.user?.id)
  useWebSocket(userId);
  const notifications = useSelector((state: RootState) => state.notifications.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotificationsAsync() as any);
  }, [dispatch]);

  const handleMarkAsRead = (id: string) => {
    dispatch(markAsReadAsync(id) as any);
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsReadAsync() as any);
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
          <button
            onClick={handleMarkAllAsRead}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Check className="h-5 w-5 mr-2" />
            Mark all as read
          </button>
        </div>

        <div className="mt-6">
          <div className="flow-root">
            <ul className="-mb-8">
              {notifications.map((notification, index) => (
                <li key={notification.id}>
                  <div className="relative pb-8">
                    {index !== notifications.length - 1 && (
                      <span
                        className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    )}
                    <div className="relative flex items-start space-x-3">
                      <div
                        className={`relative ${
                          notification.read ? 'bg-gray-400' : 'bg-indigo-500'
                        } rounded-full p-2`}
                      >
                        <Bell className="h-6 w-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1 py-1.5">
                        <div className="text-sm text-gray-500">
                          <div className="flex justify-between items-start">
                            <span className="font-medium text-gray-900">
                              {notification.message}
                            </span>
                            <div className="flex items-center space-x-4">
                              <span className="text-sm text-gray-500">
                                {new Date(notification.createdAt).toLocaleString()}
                              </span>
                              {!notification.read && (
                                <button
                                  onClick={() => handleMarkAsRead(notification.id)}
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  Mark as read
                                </button>
                              )}
                            </div>
                          </div>
                          <span
                            className={`inline-flex mt-2 rounded-full px-2 text-xs font-semibold ${
                              notification.read
                                ? 'bg-gray-100 text-gray-800'
                                : 'bg-indigo-100 text-indigo-800'
                            }`}
                          >
                            {notification.type.replace('_', ' ')}
                          </span>
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
  );
};

export default Notifications;
