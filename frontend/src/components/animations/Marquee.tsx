"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;

  className?: string;

  /**
   * Pixels per second approximation.
   */
  speed?: number;

  /**
   * Scroll direction.
   */
  reverse?: boolean;

  /**
   * Pause animation while hovering.
   */
  pauseOnHover?: boolean;

  /**
   * Vertical marquee.
   */
  vertical?: boolean;
}

export function Marquee({
  children,
  className,
  speed = 40,
  reverse = false,
  pauseOnHover = true,
  vertical = false,
}: MarqueeProps) {
  const duration = 100 / speed;

  return (
    <div
      className={cn(
        "group overflow-hidden",
        vertical ? "h-full" : "w-full",
        className,
      )}
    >
      <motion.div
        className={cn(
          "flex shrink-0",
          vertical ? "flex-col" : "flex-row whitespace-nowrap",
        )}
        animate={
          vertical
            ? {
                y: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
              }
            : {
                x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
              }
        }
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
        whileHover={pauseOnHover ? { animationPlayState: "paused" } : undefined}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className={cn("flex shrink-0", vertical ? "flex-col" : "flex-row")}
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
