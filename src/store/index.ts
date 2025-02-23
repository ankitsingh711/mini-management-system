import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import customerReducer from './slices/customerSlice';
import notificationReducer from './slices/notificationSlice';

const preloadedState = {
  auth: {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
  },
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customerReducer,
    notifications: notificationReducer,
  },
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
