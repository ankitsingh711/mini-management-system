import express from "express";
import {
  createNotification,
  getNotificationsByUser,
  markNotificationAsRead,
  deleteNotification,
  markAllNotificationsAsRead,
} from "../controllers/notificationController";
import { authenticate } from "middleware/authMiddleware";

const router = express.Router();

router.post("/", authenticate, createNotification);                    // Create a notification
router.get("/:userId", authenticate, getNotificationsByUser);          // Get notifications for a user
router.patch("/:id/read", authenticate, markNotificationAsRead);       // Mark a notification as read
router.patch("/:id/read-all", authenticate, markAllNotificationsAsRead);       // Mark a notification as read
router.delete("/:id", authenticate, deleteNotification);               // Delete a notification

export default router;
