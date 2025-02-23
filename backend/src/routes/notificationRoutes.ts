import { Router } from "express";
import {
  getNotificationsByUserService,
  markNotificationAsReadService,
  markAllNotificationsAsReadService,
} from "../services/notificationService";

const router = Router();

// GET Notifications by User ID
router.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const notifications = await getNotificationsByUserService(userId);
    res.json(notifications);
  } catch (error) {
    next(error);
  }
});

// PATCH Mark Notification as Read
router.patch("/:id/read", async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await markNotificationAsReadService(id);
    res.json({ message });
  } catch (error) {
    next(error);
  }
});

// PATCH Mark All Notifications as Read
router.patch("/:userId/read-all", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const message = await markAllNotificationsAsReadService(userId);
    res.json({ message });
  } catch (error) {
    next(error);
  }
});

export default router;
