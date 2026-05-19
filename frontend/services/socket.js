import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_API_URL, {
  reconnection: true,
  reconnectionAttempts: 5,
});
               
export default socket;