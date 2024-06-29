// AppContext.js
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  return (
    <AppContext.Provider value={{ messages, setMessages }}>
      {children}
    </AppContext.Provider>
  );
};
