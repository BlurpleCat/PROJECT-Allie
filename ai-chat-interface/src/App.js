import React, { useState, useEffect } from "react";
import ChatBox from "./ChatBox";
import InputBox from "./InputBox";
import SettingsPage from "./SettingsPage";

const App = () => {
  // Initialize dark mode state from localStorage
  const storedDarkMode = localStorage.getItem("isDarkMode") === "true";
  const [isDarkMode, setIsDarkMode] = useState(storedDarkMode);

  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  const [isTyping, setIsTyping] = useState(false);
  const [aiReady, setAiReady] = useState(true);
  const [selectedModel, setSelectedModel] = useState("Example 1");
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Save messages to localStorage
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    // Store dark mode preference in localStorage
    localStorage.setItem("isDarkMode", isDarkMode);
  }, [isDarkMode]);

  const handleSendMessage = async (userMessage) => {
    if (!userMessage.trim() || !aiReady) return;

    setAiReady(false);

    const newMessage = { sender: "user", text: userMessage, timestamp: new Date() };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setIsTyping(true);

    // Simulating the AI response
    setTimeout(() => {
      const aiMessage = { sender: "ai", text: "Hello World!", timestamp: new Date() };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
      setIsTyping(false);
      setAiReady(true);
    }, 500); // Simulate 0.5-second delay for the AI response
  };

  const handleThemeChange = (theme) => {
    setIsDarkMode(theme);
  };

  const handleClearConversation = () => {
    if (window.confirm("Are you sure you want to clear the conversation?")) {
      setMessages([]);
      localStorage.removeItem("chatMessages");
    }
  };

  return (
    <div style={{ ...styles.container, ...(isDarkMode ? styles.dark : styles.light) }}>
      <header style={styles.header}>
        <button onClick={() => setShowSettings(!showSettings)} style={styles.settingsButton}>
          ⚙️
        </button>
      </header>
      {showSettings ? (
        <SettingsPage
          handleThemeChange={handleThemeChange}
          isDarkMode={isDarkMode}
          handleClearConversation={handleClearConversation}
        />
      ) : (
        <>
          <ChatBox messages={messages} isTyping={isTyping} isDarkMode={isDarkMode} />
          <div style={{ ...styles.inputWrapper, backgroundColor: isDarkMode ? "#333" : "#fff" }}>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              style={{
                ...styles.dropdown,
                color: isDarkMode ? "#000" : "#000", // White text for light mode, black for dark mode
              }}
            >
              <option>Example 1</option>
              <option>Example 2</option>
            </select>
            <InputBox onSendMessage={handleSendMessage} disabled={!aiReady} isDarkMode={isDarkMode} />
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100%",
  },
  light: {
    backgroundColor: "#f9f9f9",
    color: "#000",
  },
  dark: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
  },
  header: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "10px 20px",
  },
  settingsButton: {
    fontSize: "1.5rem",
    background: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    padding: "15px",
    backgroundColor: "#fff",
  },
  dropdown: {
    padding: "10px",
    borderRadius: "15px",
    marginRight: "15px",
    border: "1px solid #ccc",
  },
};

export default App;
