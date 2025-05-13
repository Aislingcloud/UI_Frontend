import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'User', text: input };
    setChatLog(prev => [...prev, userMessage]);

    const response = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();
    const botMessage = { sender: 'Bot', text: data.reply };
    setChatLog(prev => [...prev, botMessage]);

    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="chat-container">
      <h2>Chat with Flask Bot</h2>
      <div className="chat-box">
        {chatLog.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender === 'User' ? 'user' : 'bot'}`}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default App;
