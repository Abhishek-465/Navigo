import React, { useState,useContext } from 'react';
import axios from 'axios';
import { FaPaperPlane } from 'react-icons/fa';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { role: 'user', content: input };
    setMessages(prevMessages => [...prevMessages, newMessage]);

    try {
      const response = await axios.post('http://localhost:3001/gemini', { prompt: input });
      const reply = response.data.reply;

      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: reply }]);
    } catch (error) {
      console.error('Error:', error);
    }

    setInput('');
  };

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen flex flex-col bg-blue-50 dark:bg-gray-900`}>
      <div className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800">
        <h1 className="text-3xl text-center mx-auto font-semibold text-gray-900 dark:text-gray-100  text-transparent bg-gradient-to-b from-gray-600 to-gray-900 dark:bg-gradient-to-b dark:from-gray-500 dark:to-white bg-clip-text">Navigo AI</h1>
       
      </div>
      
      <div className="container mx-auto p-4">
        <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <p className="text-gray-700 dark:text-gray-200 mb-4">Welcome to the Navigo AI guide! You can ask about different cities, expenses, and general queries of public places in different locations. Please keep your questions specific.</p>
          
          <div className="flex w-full mb-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow p-2 border border-gray-400 rounded-l-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100  outline-none"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSend}
              className="p-2 py-3.5 bg-blue-600 hover:bg-blue-800 text-white rounded-r-lg flex items-center justify-center"
            >
              <FaPaperPlane />
            </button>
          </div>
          
          <div className="messages-container flex-grow bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow-inner overflow-y-auto">
            <div className="space-y-4">
              {messages.length === 0 ? (
                <p className="text-gray-700 dark:text-gray-200">No messages yet. Start the conversation!</p>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg max-w-lg ${
                      msg.role === 'user'
                        ? 'ml-auto bg-blue-500 text-white'
                        : 'mr-auto bg-gray-300 dark:bg-gray-700 dark:text-gray-100'
                    }`}
                  >
                    {msg.content}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
