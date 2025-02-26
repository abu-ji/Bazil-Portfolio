import React, { useState } from "react";
import "./Chatbot.css";

// Access API key from the .env file 
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);

  const toggleChatbot = () => setIsOpen(!isOpen);

  // Hardcoded responses for basic interactions
  const predefinedResponses = {
    hello: "Hello! How can I assist you today? 😊",
    hi: "Hi there! What can I help you with?",
    "what's up": "Not much! Just here to chat. How about you?",
    "how are you": "I'm just a bot, but thanks for asking! How are you?",
    hey: "Hey! Hope you're having a great day!",
    "good morning": "Good morning! How can I assist you?",
    "good afternoon": "Good afternoon! What’s on your mind?",
    "good evening": "Good evening! How can I help?",
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput("");

    // Convert input to lowercase for case-insensitive matching
    const userMessageLower = userInput.toLowerCase();

    // Check if a predefined response exists
    if (predefinedResponses[userMessageLower]) {
      setMessages([
        ...newMessages,
        { sender: "bot", text: predefinedResponses[userMessageLower] },
      ]);
      return;
    }

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`, // Use API key from .env
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: userInput }],
          max_tokens: 150,
        }),
      });

      const data = await response.json();
      const botMessage = data.choices[0]?.message?.content || "Sorry, I didn't understand that.";

      // Add the bot's response to the messages array
      setMessages([...newMessages, { sender: "bot", text: botMessage }]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
      setMessages([...newMessages, { sender: "bot", text: "Oops! Something went wrong. Try again later." }]);
    }
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <div id="chatbot-icon" onClick={toggleChatbot}>
        💬
      </div>

      {/* Chatbot UI */}
      {isOpen && (
        <div id="chatbot-container">
          <div id="chatbot-header">
            <span>Chatbot</span>
            <button id="close-btn" onClick={toggleChatbot}>&times;</button>
          </div>
          <div id="chatbot-body">
            <div id="chatbot-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
            </div>
          </div>
          <div id="chatbot-input-container">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
