import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from '../../types';

// Async thunks
export const fetchNotificationsAsync = createAsyncThunk<Notification[]>(
  'notifications/fetchNotifications',
  async () => {
    const response = await fetch('/api/notifications'); // Replace with your API endpoint
    return await response.json();
  }
);

export const markAsReadAsync = createAsyncThunk<string, string>(
  'notifications/markAsRead',
  async (id) => {
    await fetch(`/api/notifications/${id}/read`, { method: 'PATCH' }); // Replace with your API endpoint
    return id;
  }
);

export const markAllAsReadAsync = createAsyncThunk<void>(
  'notifications/markAllAsRead',
  async () => {
    await fetch('/api/notifications/read-all', { method: 'PATCH' }); // Replace with your API endpoint
  }
);

// State interface
interface NotificationState {
  items: Notification[];
}

const initialState: NotificationState = {
  items: [],
};

// Slice
const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.items.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationsAsync.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(markAsReadAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload);
        if (index !== -1) state.items[index].read = true;
      })
      .addCase(markAllAsReadAsync.fulfilled, (state) => {
        state.items.forEach((item) => (item.read = true));
      });
  },
});

export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
