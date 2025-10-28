// ==================== App.jsx ====================
import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const parseTable = (text) => {
    const lines = text.split('\n').filter(line => line.trim());
    const tableLines = lines.filter(line => line.includes('|'));
    
    if (tableLines.length < 2) return null;

    const headers = tableLines[0]
      .split('|')
      .map(h => h.trim())
      .filter(h => h);
    
    const rows = tableLines
      .slice(2) // Skip header and separator line
      .map(line => 
        line.split('|')
          .map(cell => cell.trim())
          .filter(cell => cell !== '')
      )
      .filter(row => row.length > 0);

    return { headers, rows };
  };

  const formatTextContent = (text) => {
    // Split by bold markers and process each part
    const parts = [];
    let currentText = text;
    const boldRegex = /\*\*(.*?)\*\*|\*(.*?)\*/g;
    let lastIndex = 0;
    let match;

    while ((match = boldRegex.exec(currentText)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: currentText.slice(lastIndex, match.index)
        });
      }
      
      // Add bold text
      parts.push({
        type: 'bold',
        content: match[1] || match[2]
      });
      
      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < currentText.length) {
      parts.push({
        type: 'text',
        content: currentText.slice(lastIndex)
      });
    }

    return parts.length > 0 ? parts : [{ type: 'text', content: text }];
  };

  const renderMessage = (text) => {
    const sections = [];
    const lines = text.split('\n');
    let currentSection = [];
    let inTable = false;

    lines.forEach((line, idx) => {
      const isTableLine = line.trim().includes('|');
      
      if (isTableLine && !inTable) {
        // Start of table - save previous text section
        if (currentSection.length > 0) {
          sections.push({
            type: 'text',
            content: currentSection.join('\n')
          });
          currentSection = [];
        }
        inTable = true;
        currentSection.push(line);
      } else if (isTableLine && inTable) {
        // Continue table
        currentSection.push(line);
      } else if (!isTableLine && inTable) {
        // End of table
        sections.push({
          type: 'table',
          content: currentSection.join('\n')
        });
        currentSection = [line];
        inTable = false;
      } else {
        // Regular text
        currentSection.push(line);
      }
    });

    // Add remaining section
    if (currentSection.length > 0) {
      if (inTable) {
        sections.push({
          type: 'table',
          content: currentSection.join('\n')
        });
      } else {
        sections.push({
          type: 'text',
          content: currentSection.join('\n')
        });
      }
    }

    return sections;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages([...messages, newMessage]);
    setInput("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMessage = { sender: "bot", text: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { 
        sender: "bot", 
        text: "Sorry, I'm having trouble connecting. Please try again."
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark' : 'light'}`}>
      <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {isDarkMode ? (
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          ) : (
            <>
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </>
          )}
        </svg>
      </button>

      <div className="chat-wrapper">
        <div ref={chatBoxRef} className="chat-box">
          {messages.map((msg, i) => (
            <div key={i} className={`message-container ${msg.sender}`}>
              <div className="avatar-wrapper">
                <div className="avatar">
                  {msg.sender === 'bot' ? (
                    <img 
                      src="https://miro.medium.com/1*-xb7cKgxlETNml550rqvYA.jpeg" 
                      alt="Bot" 
                      className="avatar-image"
                    />
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  )}
                </div>
              </div>
              <div className="message-bubble">
                {msg.sender === 'bot' ? (
                  renderMessage(msg.text).map((section, sIdx) => {
                    if (section.type === 'table') {
                      const tableData = parseTable(section.content);
                      if (!tableData) return null;
                      
                      return (
                        <div key={sIdx} className="table-container">
                          <table className="chat-table">
                            <thead>
                              <tr>
                                {tableData.headers.map((header, hIdx) => (
                                  <th key={hIdx}>{header}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {tableData.rows.map((row, rIdx) => (
                                <tr key={rIdx}>
                                  {row.map((cell, cIdx) => (
                                    <td key={cIdx}>{cell}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    } else {
                      // Text section with bold formatting
                      const textParts = formatTextContent(section.content);
                      return (
                        <div key={sIdx} className="text-section">
                          {textParts.map((part, pIdx) => {
                            if (part.type === 'bold') {
                              return <strong key={pIdx}>{part.content}</strong>;
                            }
                            return <span key={pIdx}>{part.content}</span>;
                          })}
                        </div>
                      );
                    }
                  })
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="input-container">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Send a message..."
            className="message-input"
          />
          <button
            onClick={handleSend}
            className="send-button"
            disabled={!input.trim()}
            title="Send message"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;