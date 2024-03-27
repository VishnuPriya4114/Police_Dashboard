import React, { createContext, useContext, useState } from 'react';

const MessageContext = createContext();

export const useMessage = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState([]);

  const sendMessage = (msg) => {
    setMessage((prevMessage)=>[...prevMessage,msg]);
  };

  return (
    <MessageContext.Provider value={{ message, sendMessage }}>
      {children}
    </MessageContext.Provider>
  );
};