import app from './app';
import http from 'http';
import { initWebSocket } from './utils/websocket';

const server = http.createServer(app);
initWebSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});