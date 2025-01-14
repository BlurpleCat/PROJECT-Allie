import React from "react";

const ChatBox = ({ messages, isTyping, isDarkMode }) => {
  return (
    <div style={styles.chatBox}>
      {messages.map((message, index) => (
        <div
          key={index}
          style={styles.messageContainer}
        >
          <div
            style={{
              ...styles.message,
              backgroundColor: message.sender === "user" ? (isDarkMode ? "#444" : "#e0e0e0") : (isDarkMode ? "#333" : "#f1f1f1"),
              color: isDarkMode ? "#fff" : "#000", // Ensure text is readable
            }}
          >
            <div>{message.text}</div>
            <span style={styles.timestamp}>{new Date(message.timestamp).toLocaleTimeString()}</span>
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
    flexDirection: "column", // Stack messages vertically
    alignItems: "flex-end", // Align all messages to the right side of the container
  },
  messageContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end", // Ensure each message container is aligned to the right
    margin: "10px 0", // Added margin to give space between messages
  },
  message: {
    borderRadius: "10px",
    padding: "10px",
    maxWidth: "75%", // Limit message width to 75% of container
    wordWrap: "break-word",
    flexShrink: 0, // Prevent shrinking
    position: "relative",
  },
  timestamp: {
    fontSize: "0.8rem",
    color: "#888",
    position: "absolute",
    bottom: "-15px", // Move timestamp further below the message bubble
    right: "10px",
  },
  typingIndicator: {
    fontSize: "1rem",
    color: "#aaa",
    marginTop: "10px",
  },
};

export default ChatBox;
