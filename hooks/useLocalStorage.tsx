"use client";

import { createContext, useState } from "react";

interface localStorageContext {
  setItem: (key: string, value: string) => void;
  getItem: (key: string) => string | null;

  removeItem: (key: string) => void;
}

export const LocalStorageContext = createContext<localStorageContext>({
  setItem: () => {},
  getItem: () => null,
  removeItem: () => {},
});

export const LocalStorageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const setItem = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  const getItem = (key: string) => {
    return localStorage.getItem(key);
  };

  const removeItem = (key: string) => {
    localStorage.removeItem(key);
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
