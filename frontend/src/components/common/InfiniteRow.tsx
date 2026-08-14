"use client";

/**
 * -----------------------------------------------------------------------------
 * Infinite Row
 * -----------------------------------------------------------------------------
 */

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

import type { ReactNode } from "react";

interface InfiniteRowProps {
  children: ReactNode;

  direction?: "left" | "right";

  speed?: number;

  pauseOnHover?: boolean;

  className?: string;
}

export function InfiniteRow({
  children,
  direction = "left",
  speed = 35,
  pauseOnHover = true,
  className,
}: InfiniteRowProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: 0.8,
      }}
      className={cn("relative overflow-hidden", className)}
    >
      {/* Left Fade */}

      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-40 bg-gradient-to-r from-background to-transparent" />

      {/* Right Fade */}

      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-40 bg-gradient-to-l from-background to-transparent" />

      <div
        className={cn(
          "flex w-max items-center gap-12",
          direction === "left"
            ? "animate-marquee-left"
            : "animate-marquee-right",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {children}
        {children}
      </div>
    </motion.div>
  );
}
