import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <MyContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
