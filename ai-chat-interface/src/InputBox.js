import React, { useState } from "react";

const InputBox = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <div style={styles.inputContainer}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        style={styles.input}
        onKeyPress={(e) => e.key === "Enter" && !disabled && handleSend()}
        disabled={disabled}
      />
      <button onClick={handleSend} style={styles.button} disabled={disabled}>
        Send
      </button>
    </div>
  );
};

const styles = {
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: "5px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    marginRight: "10px",
    outline: "none",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    disabled: {
      backgroundColor: "#ccc",
      cursor: "not-allowed",
    },
  },
};

export default InputBox;
