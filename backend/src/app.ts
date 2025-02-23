import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/authRoutes';
import customerRoutes from './routes/customerRoutes';
import paymentRoutes from './routes/paymentRoutes';
import notificationRoutes from './routes/notificationRoutes';
import { errorMiddleware } from './middleware/errorMiddleware';
import http from "http";
import { Server } from "socket.io";
import type { Notification } from './services/notificationService';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/notifications', notificationRoutes)

const clients: Record<string, any> = {};

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  socket.on("register", (userId: string) => {
    clients[userId] = socket;
    console.log(`User ${userId} registered for notifications`);
  });

  socket.on("disconnect", () => {
    const userId = Object.keys(clients).find((id) => clients[id] === socket);
    if (userId) delete clients[userId];
    console.log("Client disconnected", socket.id);
  });
});

export const broadcastNotification = (notification: Notification) => {
  const { userId } = notification;
  if (clients[userId]) {
    clients[userId].emit("notification", notification);
  }
};

app.use(errorMiddleware);

export default app;