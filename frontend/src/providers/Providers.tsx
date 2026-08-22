// src/providers/Providers.tsx
"use client";

import { ReactNode } from "react";
import { ToastProvider } from "./ToastProvider";
import { ThemeProvider } from "./ThemeProvider";
import { PointerEffect } from "./PointerEffect";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      {children}
      <PointerEffect />
      <ToastProvider />
    </ThemeProvider>
  );
}
