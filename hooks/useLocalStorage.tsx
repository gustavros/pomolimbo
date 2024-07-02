"use client";

import { createContext, useEffect, useState } from "react";

interface LocalStorageContextType {
  setItem: (key: string, value: string) => void;
  getItem: (key: string) => string | null;
  removeItem: (key: string) => void;
}

export const LocalStorageContext = createContext<LocalStorageContextType>({
  setItem: () => {},
  getItem: () => null,
  removeItem: () => {},
});

export const LocalStorageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const setItem = (key: string, value: string) => {
    if (isClient) {
      localStorage.setItem(key, value);
    }
  };

  const getItem = (key: string) => {
    if (isClient) {
      return localStorage.getItem(key);
    }
    return null;
  };

  const removeItem = (key: string) => {
    if (isClient) {
      localStorage.removeItem(key);
    }
  };

  return (
    <LocalStorageContext.Provider
      value={{
        getItem,
        setItem,
        removeItem,
      }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};
