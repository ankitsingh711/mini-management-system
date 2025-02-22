import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import customerReducer from './slices/customerSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customerReducer,
    notifications: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;