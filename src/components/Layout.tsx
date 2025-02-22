import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) return null;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;