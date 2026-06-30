import { useState } from "react";
import "./index.css";

export default function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setMessage("");

    // Add user message instantly
    setChat((prev) => [...prev, { role: "user", text: userMessage }]);

    setLoading(true);

    try {
     const res = await fetch("http://127.0.0.1:8000/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ message: userMessage }),
});

      const data = await res.json();

      setChat((prev) => [
        ...prev,
        { role: "ai", text: data.reply },
      ]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        { role: "ai", text: "⚠️ Error connecting to server" },
      ]);
    }

    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const clearChat = () => setChat([]);

  return (
    <div className="app">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>💡 ThinkHub AI</h2>
        <button onClick={clearChat}>+ New Chat</button>
      </div>

      {/* Chat Section */}
      <div className="chat-area">
        <div className="chat-box">
          {chat.map((c, i) => (
            <div key={i} className={c.role}>
              {c.role === "user" ? "You: " : "AI: "}
              {c.text}
            </div>
          ))}

          {loading && <div className="ai">AI is typing...</div>}
        </div>

        {/* Input */}
        <div className="input-area">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Message AI..."
          />
          <button onClick={sendMessage}>➤</button>
        </div>
      </div>
    </div>
  );
}