"use client";

import React, { createContext, useContext, useState } from "react";

interface LoadingContextType {
  isFinished: boolean;
  finishLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isFinished: false,
  finishLoading: () => { },
});

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isFinished, setIsFinished] = useState(false);

  return (
    <LoadingContext.Provider value={{ isFinished, finishLoading: () => setIsFinished(true) }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
