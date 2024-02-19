"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

// Create a context
const SidebarContext = createContext();

// Create a context provider
export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook to access the context
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
