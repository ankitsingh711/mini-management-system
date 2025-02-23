import { Request, Response } from "express";
import {
  createNotificationService,
  getNotificationsByUserService,
  markNotificationAsReadService,
  deleteNotificationService,
} from "../services/notificationService";

// CREATE Notification
export const createNotification = async (req: Request, res: Response) => {
  try {
    const message = await createNotificationService(req.body);
    res.status(201).json({ message });
  } catch (error) {
    res.status(500).json({ error: "Failed to create notification" });
  }
};

// GET Notifications by User ID
export const getNotificationsByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const notifications = await getNotificationsByUserService(userId);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Failed to get notifications" });
  }
};

// MARK Notification as Read
export const markNotificationAsRead = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const message = await markNotificationAsReadService(id);
    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ error: "Failed to mark notification as read" });
  }
};

// DELETE Notification
export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const message = await deleteNotificationService(id);
    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete notification" });
  }
};
