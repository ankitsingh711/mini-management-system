import { Server } from 'socket.io';

let io: Server;
export const initWebSocket = (server: any) => {
  io = new Server(server);
};

export const sendNotification = (message: string) => {
  io.emit('notification', message);
};