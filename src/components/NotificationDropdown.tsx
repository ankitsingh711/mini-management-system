import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { RootState } from '../store';
import { markAsRead, markAllAsRead } from '../store/slices/notificationSlice';
import { Notification } from '../types';

const NotificationDropdown = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state: RootState) => state.notifications);

  const handleMarkAsRead = (id: string) => {
    dispatch(markAsRead(id));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
          <button
            onClick={handleMarkAllAsRead}
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Mark all as read
          </button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No notifications
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {notifications.map((notification: Notification) => (
              <div
                key={notification.id}
                className={`p-4 ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
              >
                <div className="flex justify-between">
                  <p className="text-sm text-gray-900">{notification.message}</p>
                  {!notification.read && (
                    <button
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="text-xs text-indigo-600 hover:text-indigo-500"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {format(new Date(notification.createdAt), 'MMM dd, yyyy HH:mm')}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;