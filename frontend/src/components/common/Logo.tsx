"use client";

import Image from "next/image";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("relative inline-block", className)}>
      {/* Light Theme Logo (Visible by default, hidden when .dark wrapper is active) */}
      <Image
        src={siteConfig.images.logoLightMode}
        alt={`${siteConfig.name} Logo`}
        width={180}
        height={45}
        priority
        className="block dark:hidden"
      />

      {/* Dark Theme Logo (Hidden by default, visible when .dark wrapper is active) */}
      <Image
        src={siteConfig.images.logoDarkMode}
        alt={`${siteConfig.name} Logo`}
        width={180}
        height={45}
        priority
        className="hidden dark:block"
      />
    </div>
  );
}
