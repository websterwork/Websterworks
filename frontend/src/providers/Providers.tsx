// src/providers/Providers.tsx
"use client";

import { ReactNode } from "react";
import { ToastProvider } from "./ToastProvider";
import { ThemeProvider } from "./ThemeProvider";
interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
      <ThemeProvider>
      {children}
      <ToastProvider />
      </ThemeProvider>
  );
}
