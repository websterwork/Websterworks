// src/app/(marketing)/industries/layout.tsx
import type { ReactNode } from "react";

interface IndustriesLayoutProps {
  children: ReactNode;
}

export default function IndustriesLayout({ children }: IndustriesLayoutProps) {
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col">
      {children}
    </div>
  );
}