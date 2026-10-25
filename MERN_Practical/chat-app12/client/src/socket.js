import { io } from "socket.io-client";

// Point this at your Node.js server URL
const SERVER_URL = "http://localhost:5000";

// autoConnect: false lets App.jsx connect only after the user enters a username
export const socket = io(SERVER_URL, {
  autoConnect: false,
});
