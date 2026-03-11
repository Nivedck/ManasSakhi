import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X } from 'lucide-react';

const CHAT_URL = import.meta.env.VITE_LYZR_CHAT_URL;
const API_KEY = import.meta.env.VITE_LYZR_API_KEY;
const AGENT_ID = import.meta.env.VITE_LYZR_AGENT_ID;
const DEFAULT_USER_ID = import.meta.env.VITE_LYZR_USER_ID || 'guest@manassakhi.app';

const starterMessages = [
  {
    id: 'm1',
    role: 'assistant',
    text: 'Hey, I am here with you. Want to tell me what is going on?'
  }
];

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState(starterMessages);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isSending]);

  const getSessionId = () => {
    const existing = localStorage.getItem('lyzr_session_id');
    if (existing) {
      return existing;
    }

    const generated = `${AGENT_ID || 'agent'}-${Math.random().toString(36).slice(2, 12)}`;
    localStorage.setItem('lyzr_session_id', generated);
    return generated;
  };

  const extractReplyText = (responseBody) => {
    if (!responseBody || typeof responseBody !== 'object') {
      return '';
    }

    return (
      responseBody.response ||
      responseBody.message ||
      responseBody.output ||
      responseBody.reply ||
      responseBody.data?.response ||
      responseBody.data?.message ||
      responseBody.data?.output ||
      responseBody.data?.reply ||
      ''
    );
  };

  const handleSend = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed) {
      return;
    }

    if (!CHAT_URL || !API_KEY || !AGENT_ID) {
      setErrorMessage('Chat is not configured yet. Please check the env values.');
      return;
    }

    const userMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setErrorMessage('');
    setIsSending(true);

    try {
      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({
          user_id: DEFAULT_USER_ID,
          agent_id: AGENT_ID,
          session_id: getSessionId(),
          message: trimmed,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with ${response.status}`);
      }

      const responseBody = await response.json();
      const replyText = extractReplyText(responseBody) || 'I am here with you. Want to share more?';

      const assistantMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        text: replyText,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setErrorMessage('Unable to reach the chat service. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <motion.button
        className="floating-chat-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        onClick={() => setIsOpen(true)}
        aria-label="Open chat"
      >
        <MessageCircle size={24} color="var(--white)" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="chat-panel"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="chat-header">
                <div>
                  <h3>ManasSakhi</h3>
                  <p>Always here to listen</p>
                </div>
                <button
                  className="chat-close"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="chat-body" ref={chatBodyRef}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`chat-bubble ${message.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'}`}
                  >
                    {message.text}
                  </div>
                ))}
                {isSending && (
                  <div className="chat-bubble chat-bubble-assistant chat-typing">
                    Typing...
                  </div>
                )}
                {errorMessage && (
                  <div className="chat-error">
                    {errorMessage}
                  </div>
                )}
              </div>

              <div className="chat-input">
                <input
                  type="text"
                  placeholder="Type how you feel"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      handleSend();
                    }
                  }}
                  disabled={isSending}
                />
                <button onClick={handleSend} aria-label="Send message" disabled={isSending}>
                  <Send size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChat;
