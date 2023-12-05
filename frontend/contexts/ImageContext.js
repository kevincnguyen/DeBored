import React, { createContext, useContext, useState, useMemo } from "react";

const ImageContext = createContext();

/*
 * Provider that manages the image state
 */
export const ImageProvider = ({ children }) => {
  const [imageKey, setImageKey] = useState(0);

  // Function that updates the image information
  const updateImageKey = () => {
    setImageKey((prev) => prev + 1);
  };

  // Memoize the context value to prevent unnecessary renders
  const contextValue = useMemo(
    () => ({
      imageKey,
      updateImageKey,
    }),
    [imageKey]
  );

  return (
    <ImageContext.Provider value={contextValue}>
      {children}
    </ImageContext.Provider>
  );
};

// Hook to easily use the image context
export const useImage = () => {
  const context = useContext(ImageContext);

  if (!context) {
    throw new Error("useImage must be used within a ImageProvider");
  }

  return context;
};
