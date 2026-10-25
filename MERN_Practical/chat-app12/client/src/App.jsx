import { useEffect, useRef, useState } from "react";
import { socket } from "./socket";

export default function App() {
  const [joined, setJoined] = useState(false);
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUser, setTypingUser] = useState("");

  const typingTimeoutRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Set up listeners once, on mount
  useEffect(() => {
    function handleReceiveMessage(data) {
      setMessages((prev) => [...prev, data]);
    }

    function handleUserJoined(data) {
      setMessages((prev) => [
        ...prev,
        { system: true, text: data.message },
      ]);
      setOnlineUsers(data.users);
    }

    function handleUserLeft(data) {
      setMessages((prev) => [
        ...prev,
        { system: true, text: data.message },
      ]);
      setOnlineUsers(data.users);
    }

    function handleDisplayTyping(name) {
      setTypingUser(name);
    }

    function handleHideTyping() {
      setTypingUser("");
    }

    socket.on("receive_message", handleReceiveMessage);
    socket.on("user_joined", handleUserJoined);
    socket.on("user_left", handleUserLeft);
    socket.on("display_typing", handleDisplayTyping);
    socket.on("hide_typing", handleHideTyping);

    // Cleanup listeners when component unmounts
    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("user_joined", handleUserJoined);
      socket.off("user_left", handleUserLeft);
      socket.off("display_typing", handleDisplayTyping);
      socket.off("hide_typing", handleHideTyping);
    };
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleJoin = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    socket.connect();
    socket.emit("join", username.trim());
    setJoined(true);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const data = {
      username,
      text: text.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    socket.emit("send_message", data);
    socket.emit("stop_typing");
    setText("");
  };

  const handleTyping = (e) => {
    setText(e.target.value);
    socket.emit("typing", username);

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop_typing");
    }, 1000);
  };

  if (!joined) {
    return (
      <div className="join-container">
        <form onSubmit={handleJoin} className="join-form">
          <h1>Join Chat</h1>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <button type="submit">Join</button>
        </form>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <aside className="sidebar">
        <h2>Online ({onlineUsers.length})</h2>
        <ul>
          {onlineUsers.map((u, i) => (
            <li key={i}>{u}</li>
          ))}
        </ul>
      </aside>

      <main className="chat-main">
        <header className="chat-header">
          <h1>Real-Time Chat</h1>
          <span>Logged in as {username}</span>
        </header>

        <div className="messages">
          {messages.map((m, i) =>
            m.system ? (
              <div key={i} className="system-message">
                {m.text}
              </div>
            ) : (
              <div
                key={i}
                className={
                  m.username === username ? "message own" : "message"
                }
              >
                <span className="message-user">{m.username}</span>
                <span className="message-text">{m.text}</span>
                <span className="message-time">{m.time}</span>
              </div>
            )
          )}
          <div ref={messagesEndRef} />
        </div>

        {typingUser && (
          <div className="typing-indicator">{typingUser} is typing...</div>
        )}

        <form onSubmit={handleSend} className="message-form">
          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={handleTyping}
          />
          <button type="submit">Send</button>
        </form>
      </main>
    </div>
  );
}
