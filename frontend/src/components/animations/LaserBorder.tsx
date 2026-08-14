"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LaserBorderProps {
  className?: string;
  /** Speed of the laser sweep in seconds */
  speed?: number;
}

export function LaserBorder({ className, speed = 4 }: LaserBorderProps) {
  return (
    <div
      className={cn(
        "absolute inset-x-0 bottom-0 overflow-hidden h-0.5 w-full pointer-events-none",
        className,
      )}
    >
      {/* 1. Base Static Subdued Line */}
      <div className="absolute inset-0 bg-primary/20" />

      {/* 2. Primary Laser Sweep (#00F0FF Cyan Glow) */}
      <motion.div
        className="absolute top-0 bottom-0 w-1/3 bg-linear-to-r from-transparent via-primary to-transparent shadow-[0_0_12px_var(--primary)]"
        initial={{ x: "-100%" }}
        animate={{ x: "300%" }}
        transition={{
          repeat: Infinity,
          duration: speed,
          ease: "linear",
        }}
      />

      {/* 3. Plasma Accent Trail (#8B5CF6 Violet Pulse) */}
      <motion.div
        className="absolute top-0 bottom-0 w-1/4 bg-linear-to-r from-transparent via-accent to-transparent opacity-80 blur-[1px]"
        initial={{ x: "-100%" }}
        animate={{ x: "400%" }}
        transition={{
          repeat: Infinity,
          duration: speed * 1.3,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </div>
  );
}
