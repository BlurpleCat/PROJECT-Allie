import React from "react";

const SettingsPage = ({ handleThemeChange, isDarkMode, handleClearConversation }) => {
  return (
    <div style={styles.settingsContainer}>
      <h2 style={styles.settingsTitle}>Settings</h2>
      <div style={styles.themeSetting}>
        <span style={styles.themeLabel}>Dark Mode</span>
        <label style={styles.switch}>
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={(e) => handleThemeChange(e.target.checked)}
            style={{ display: "none" }} // Hide the default checkbox
          />
          <span
            style={{
              ...styles.slider,
              backgroundColor: isDarkMode ? "#2196F3" : "#ccc",
            }}
          >
            <span
              style={{
                ...styles.circle,
                transform: isDarkMode ? "translateX(26px)" : "translateX(0)", // Adjust the position of the circle
                backgroundColor: isDarkMode ? "#fff" : "#fff", // White circle for both states
              }}
            />
          </span>
        </label>
      </div>
      <button onClick={handleClearConversation} style={styles.clearButton}>
        Clear Conversation
      </button>
    </div>
  );
};

const styles = {
  settingsContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
  },
  settingsTitle: {
    fontSize: "1.5rem",
    marginBottom: "20px",
  },
  themeSetting: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  themeLabel: {
    fontSize: "1.2rem",
    marginRight: "10px",
  },
  switch: {
    position: "relative",
    display: "inline-block",
    width: "50px",
    height: "24px",
  },
  slider: {
    position: "absolute",
    cursor: "pointer",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    borderRadius: "50px",
    transition: "0.4s",
    display: "flex",
    justifyContent: "flex-start",
  },
  circle: {
    position: "absolute",
    height: "16px",
    width: "16px",
    borderRadius: "50%",
    transition: "0.4s",
    top: "4px",
    left: "4px",
  },
  clearButton: {
    padding: "10px 15px",
    marginTop: "20px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
};

export default SettingsPage;
