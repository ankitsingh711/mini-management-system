import { useEffect } from "react";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { addNotification } from "../store/slices/notificationSlice";

const SOCKET_SERVER_URL = "http://localhost:6754";

const useWebSocket = (userId: string | undefined) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);

    socket.on("connect", () => {
      socket.emit("register", userId);
    });

    socket.on("notification", (notification) => {
      dispatch(addNotification(notification));
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, dispatch]);
};

export default useWebSocket;
