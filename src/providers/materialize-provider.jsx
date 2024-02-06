"use client";

import { ThemeProvider } from "@material-tailwind/react";

export const MaterializeProvider = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
