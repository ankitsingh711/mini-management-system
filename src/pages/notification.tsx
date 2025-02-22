import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setNotifications, markAsRead, markAllAsRead } from '../store/slices/notificationSlice';
import { format } from 'date-fns';

const NotificationsPage = () => {
  const dispatch = useDispatch();
  const { notifications, unreadCount } = useSelector((state: RootState) => state.notifications);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/notifications');
        if (!response.ok) throw new Error('Failed to fetch notifications');
        const data = await response.json();
        dispatch(setNotifications(data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleMarkAsRead = (id: string) => {
    dispatch(markAsRead(id));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Notifications</h1>
      <div className="mb-4">
        <button
          onClick={handleMarkAllAsRead}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Mark All as Read ({unreadCount})
        </button>
      </div>
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`border-b border-gray-200 py-2 ${notification.read ? 'text-gray-500' : 'text-black'}`}
            >
              <p className="font-medium">{notification.message}</p>
              <p className="text-sm text-gray-500">
                {format(new Date(notification.createdAt), 'MMM dd, yyyy HH:mm')}
              </p>
              {!notification.read && (
                <button
                  onClick={() => handleMarkAsRead(notification.id)}
                  className="text-blue-500 hover:underline"
                >
                  Mark as Read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationsPage;
