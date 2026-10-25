# Practical: Develop a Real-Time Chat Application using Socket.io, React and Node.js

## Aim
To develop a real-time chat application using **Node.js** and **Socket.io** on the
backend and **React** on the frontend, demonstrating bidirectional, event-based
communication between client and server.

## Objectives
- Understand the limitations of the traditional HTTP request-response model for
  real-time applications.
- Learn how WebSockets (via Socket.io) enable full-duplex communication.
- Build a Node.js server that manages socket connections and broadcasts messages.
- Build a React frontend that connects to the server and sends/receives messages
  live, without page reloads.
- Implement typical chat features: join with username, send/receive messages,
  "user is typing" indicator, and online user list.

## Theory

### Why not plain HTTP?
HTTP is request-response based: the client must always initiate contact to get
new data. A chat app needs the **server** to push new messages to clients the
instant they arrive. Polling the server repeatedly is wasteful and slow.

### WebSockets and Socket.io
WebSockets provide a persistent, full-duplex connection between client and
server, allowing either side to send data at any time. **Socket.io** is a
library built on top of WebSockets (with fallbacks) that adds:
- Automatic reconnection
- Event-based messaging (`socket.emit`, `socket.on`)
- Rooms/namespaces for grouping clients
- Broadcasting to all or selected clients

### Architecture
```
 ┌──────────────┐        WebSocket (Socket.io)        ┌──────────────┐
 │  React Client │ <----------------------------------> │ Node.js Server│
 │ (socket.io-   │                                       │ (Express +    │
 │  client)      │ <----------------------------------> │ socket.io)    │
 └──────────────┘                                       └──────────────┘
        ▲                                                        │
        └───────────────── broadcasts to other clients ──────────┘
```

## Prerequisites
- Node.js (v18+) and npm installed
- Basic knowledge of JavaScript, React, and Express

## Project Structure
```
chat-app/
├── server/
│   ├── package.json
│   └── index.js
└── client/
    ├── package.json
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── App.css
        └── socket.js
```

## Steps to Run

### 1. Backend Setup
```bash
cd server
npm install
npm start
```
Server runs on **http://localhost:5000**

### 2. Frontend Setup (in a new terminal)
```bash
cd client
npm install
npm run dev
```
Client runs on **http://localhost:5173** (Vite default)

### 3. Test
- Open the client URL in two or more browser tabs.
- Enter a different username in each tab and click "Join".
- Send messages from one tab — they should appear instantly in all tabs.
- Start typing to see the "typing..." indicator on other tabs.
- Notice the online users list updating as tabs join/leave.

## Key Concepts Demonstrated
| Concept | Where |
|---|---|
| Socket connection setup | `server/index.js`, `client/src/socket.js` |
| Event emit/listen | `socket.emit('send_message', ...)`, `socket.on('receive_message', ...)` |
| Broadcasting | `io.emit()` vs `socket.broadcast.emit()` |
| Room/user tracking | `connectedUsers` map in `server/index.js` |
| React state + effects | `useState`, `useEffect` in `App.jsx` |
| Cleanup on unmount | `socket.off()` / `socket.disconnect()` in `useEffect` cleanup |

## Possible Extensions (for viva / further exploration)
- Persist chat history using MongoDB.
- Add private 1-to-1 messaging using Socket.io rooms.
- Add JWT-based authentication before allowing a socket connection.
- Deploy server on Render/Railway and client on Vercel/Netlify.

## Viva Questions
1. What is the difference between HTTP polling and WebSockets?
2. How does Socket.io fall back when WebSockets aren't supported?
3. What is the difference between `io.emit()`, `socket.emit()`, and
   `socket.broadcast.emit()`?
4. How would you scale this app across multiple server instances? (Hint: Redis
   adapter for Socket.io)
5. How is CORS handled between the React client and Node server?
