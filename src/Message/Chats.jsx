import React, { useState, useEffect, useRef } from "react";
import "./Chats.css";

const Chats = ({ hideBottom }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you?", sender: "bot" },
    { id: 2, text: "I need some information about your services.", sender: "user" },
    { id: 3, text: "Sure, what would you like to know?", sender: "bot" },
    { id: 4, text: "Can you tell me about your pricing?", sender: "user" },
    { id: 5, text: "Our pricing is based on the services you choose. Please visit our website for detailed information.", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { id: messages.length + 1, text: input, sender: "user" }]);
    setInput("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    hideBottom(true);
    return () => hideBottom(false);
  }, [hideBottom]);

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        Chat Support
      </div>

      {/* Chat Messages */}
      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={msg.sender === "user" ? "message-user" : "message-bot"}
          >
            <div
              className={`message-bubble ${
                msg.sender === "user" ? "user" : "bot"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="chat-input"
          placeholder="Type a message..."
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="send-button"
          aria-label="Send message"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chats;