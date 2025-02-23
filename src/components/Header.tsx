import { Bell } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store";

const Header = () => {
  const notifications = useSelector(
    (state: RootState) => state.notifications.items
  );
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-2xl font-semibold text-gray-900">
            Collection Management
          </h1>
          <div className="flex items-center">
            <Link
              to="/notifications"
              className="relative p-2 text-gray-600 hover:text-gray-900"
            >
              <Bell className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {unreadCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
