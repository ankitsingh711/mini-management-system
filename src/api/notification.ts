import axiosInstance from './axios';
import { Notification } from '../types';

export const getNotifications = async (): Promise<Notification[]> => {
  const response = await axiosInstance.get('/notifications');
  return response.data;
};

export const markNotificationAsRead = async (id: string): Promise<void> => {
  await axiosInstance.patch(`/notifications/${id}/read`);
};

export const markAllNotificationsAsRead = async (): Promise<void> => {
  await axiosInstance.patch('/notifications/read-all');
};

export const addNotification = async (notification: Omit<Notification, 'id'>): Promise<Notification> => {
  const response = await axiosInstance.post('/', notification);
  return response.data;
};
