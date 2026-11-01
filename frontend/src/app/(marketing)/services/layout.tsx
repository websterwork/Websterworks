// src/app/(marketing)/services/layout.tsx
import type { ReactNode } from "react";

interface ServicesLayoutProps {
  children: ReactNode;
}

export default function ServicesLayout({ children }: ServicesLayoutProps) {
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col">
      {children}
    </div>
  );
}