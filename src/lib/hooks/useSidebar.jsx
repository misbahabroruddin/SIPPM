"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

// Create a context
const SidebarContext = createContext();

// Create a context provider
export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState(false);
  const [windowSize, setWindowSize] = useState(null);

  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const toggleSidebarMobile = useCallback(() => {
    setIsSidebarMobileOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (windowSize >= 1140) {
        setWindowSize(window.innerWidth);
        setIsOpen(true);
        setIsSidebarMobileOpen(false);
      } else {
        setWindowSize(window.innerWidth);
        setIsOpen(false);
        setIsSidebarMobileOpen(false);
      }
    });
  }, [windowSize]);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        toggleSidebar,
        isSidebarMobileOpen,
        toggleSidebarMobile,
      }}
    >
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
