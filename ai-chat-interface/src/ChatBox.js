import React from "react";

const ChatBox = ({ messages, isTyping, isDarkMode }) => {
  return (
    <div style={styles.chatBox}>
      {messages.map((message, index) => (
        <div
          key={index}
          style={{
            ...styles.messageContainer,
            justifyContent: message.sender === "user" ? "flex-end" : "flex-start", // Align messages by sender
          }}
        >
          <div
            style={{
              ...styles.message,
              backgroundColor: message.sender === "user"
                ? isDarkMode
                  ? "#444"
                  : "#e0e0e0"
                : isDarkMode
                ? "#333"
                : "#f1f1f1",
              color: isDarkMode ? "#fff" : "#000", // Ensure text is readable
            }}
          >
            <div>{message.text}</div>
            <span
              style={{
                ...styles.timestamp,
                textAlign: message.sender === "user" ? "right" : "left", // Align timestamp
                right: message.sender === "user" ? "10px" : "auto", // Position for user messages
                left: message.sender === "user" ? "auto" : "10px", // Position for AI messages
              }}
            >
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
          </div>
        </div>
      ))}
      {isTyping && <div style={styles.typingIndicator}>AI is thinking...</div>}
    </div>
  );
};

const styles = {
  chatBox: {
    flex: 1,
    padding: "20px",
    overflowY: "scroll",
    display: "flex",
    flexDirection: "column",
  },
  messageContainer: {
    display: "flex",
    width: "100%",
    margin: "10px 0",
  },
  message: {
    borderRadius: "10px",
    padding: "10px",
    maxWidth: "75%",
    wordWrap: "break-word",
    flexShrink: 0,
    position: "relative",
    textAlign: "left",
  },
  timestamp: {
    fontSize: "0.8rem",
    color: "#888",
    position: "absolute",
    bottom: "-16px",
    whiteSpace: "nowrap", // Prevent wrapping
  },
  typingIndicator: {
    fontSize: "1rem",
    color: "#aaa",
    marginTop: "10px",
  },
};

export default ChatBox;
