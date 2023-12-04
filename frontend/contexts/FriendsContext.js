import React, { createContext, useContext, useState, useMemo } from "react";

const FriendsContext = createContext();

/*
 * Provider that manages the friends state
 */
export const FriendsProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);

  // Function that updates the friends information
  const updateFriends = (newFriends) => {
    setFriends(newFriends);
  };

  // Memoize the context value to prevent unnecessary renders
  const contextValue = useMemo(
    () => ({
      friends,
      updateFriends,
    }),
    [friends]
  );

  return (
    <FriendsContext.Provider value={contextValue}>
      {children}
    </FriendsContext.Provider>
  );
};

// Hook to easily use the friends context
export const useFriends = () => {
  const context = useContext(FriendsContext);

  if (!context) {
    throw new Error("useFriends must be used within a FriendsContext");
  }

  return context;
};
