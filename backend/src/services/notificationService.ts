import ElasticClient from "../config/db";
import { broadcastNotification } from "../app";

export interface Notification {
  id?: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt?: Date;
}

// CREATE Notification
export const createNotificationService = async (data: Notification): Promise<string> => {
  const result = await ElasticClient.index({
    index: "notifications",
    document: {
      ...data,
      isRead: false,
      createdAt: new Date(),
    },
  });

  broadcastNotification({ ...data, id: result._id });
  return "Notification created successfully";
};

// GET Notifications by User ID
export const getNotificationsByUserService = async (userId: string): Promise<Notification[]> => {
  const result = await ElasticClient.search<Notification>({
    index: "notifications",
    query: { match: { userId } },
    sort: [{ createdAt: { order: "desc" } }],
  });

  return result.hits.hits.map((hit) => ({ id: hit._id, ...hit._source })) as Notification[];
};

// MARK Notification as Read
export const markNotificationAsReadService = async (id: string): Promise<string> => {
  const result = await ElasticClient.update({
    index: "notifications",
    id,
    doc: { isRead: true },
  });

  if (result.result === "updated") {
    broadcastNotification({ id, isRead: true } as Notification);
    return "Notification marked as read";
  }

  throw new Error("Notification not found");
};

// MARK All Notifications as Read
export const markAllNotificationsAsReadService = async (userId: string): Promise<string> => {
  const result = await ElasticClient.updateByQuery({
    index: "notifications",
    query: { match: { userId } },
    script: {
      source: "ctx._source.isRead = true",
    },
  });

  if ((result.updated ?? 0) > 0) {
    broadcastNotification({ userId, isRead: true } as Notification);
    return "All notifications marked as read";
  }

  throw new Error("No notifications found to update");
};
