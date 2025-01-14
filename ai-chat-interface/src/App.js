import React, { useState, useEffect } from "react";
import ChatBox from "./ChatBox";
import InputBox from "./InputBox";
import SettingsPage from "./SettingsPage";

const App = () => {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [aiReady, setAiReady] = useState(true);
  const [selectedModel, setSelectedModel] = useState("Example 1");
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = async (userMessage) => {
    if (!userMessage.trim() || !aiReady) return;

    setAiReady(false);

    const newMessage = { sender: "user", text: userMessage, timestamp: new Date() };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setIsTyping(true);
    try {
      const response = await fetch("/api/get-ai-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, model: selectedModel }),
      });
      const data = await response.json();
      const aiMessage = { sender: "ai", text: data.response, timestamp: new Date() };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setIsTyping(false);
      setAiReady(true);
    }
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
        <h1 style={{ ...styles.title, color: isDarkMode ? "#fff" : "#000" }}>AI Alley</h1> {/* Title color adjusts based on dark mode */}
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
    justifyContent: "space-between", // Space between title and settings button
    alignItems: "center",
    padding: "10px 20px",
  },
  title: {
    fontSize: "1.5rem",
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
    backgroundColor: "#fff", // Set to white in light mode
  },
  dropdown: {
    padding: "10px",
    borderRadius: "15px",
    marginRight: "15px",
    border: "1px solid #ccc",
  },
};

export default App;
