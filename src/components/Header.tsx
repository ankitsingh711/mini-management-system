import React from 'react';
import { Bell } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import NotificationDropdown from './NotificationDropdown';

const Header = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [showNotifications, setShowNotifications] = React.useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Collection Management</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-600 hover:text-gray-900"
          >
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>
          {showNotifications && <NotificationDropdown />}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">{user?.name}</span>
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">
                {user?.name.charAt(0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;