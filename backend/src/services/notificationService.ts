import ElasticClient from "../config/db";

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
  await ElasticClient.index({
    index: "notifications",
    document: {
      ...data,
      isRead: false,
      createdAt: new Date(),
    },
  });

  return "Notification created successfully";
};

// GET Notifications by User ID
export const getNotificationsByUserService = async (userId: string): Promise<Notification[]> => {
  const result = await ElasticClient.search<Notification>({
    index: "notifications",
    query: { match: { userId } },
    sort: [{ createdAt: { order: "desc" } }],
  });

  return result.hits.hits.map(hit => hit._source as Notification);
};

// MARK Notification as Read
export const markNotificationAsReadService = async (id: string): Promise<string> => {
  await ElasticClient.update({
    index: "notifications",
    id,
    doc: { isRead: true },
  });

  return "Notification marked as read";
};

// DELETE Notification
export const deleteNotificationService = async (id: string): Promise<string> => {
  await ElasticClient.delete({
    index: "notifications",
    id,
  });

  return "Notification deleted successfully";
};
