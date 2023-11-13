import React, { createContext, useContext, useState, useMemo } from "react";

const UserContext = createContext();

/*
 * Provider that manages the user state
 */
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function that updates the user information
  const updateUser = (newUser) => {
    setUser(newUser);
  };

  // Memoize the context value to prevent unnecessary renders
  const contextValue = useMemo(
    () => ({
      user,
      updateUser,
    }),
    [user]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

// Hook to easily use the user context
export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
