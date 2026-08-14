"use client";

import { motion, type HTMLMotionProps } from "motion/react";

import { cn } from "@/lib/utils";

interface FloatingProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;

  className?: string;

  /**
   * Vertical movement in pixels.
   */
  distance?: number;

  /**
   * Animation duration in seconds.
   */
  duration?: number;

  /**
   * Delay before animation starts.
   */
  delay?: number;

  /**
   * Disable floating.
   */
  disabled?: boolean;
}

export function Floating({
  children,
  className,
  distance = 16,
  duration = 4,
  delay = 0,
  disabled = false,
  ...props
}: FloatingProps) {
  return (
    <motion.div
      className={cn(className)}
      animate={
        disabled
          ? undefined
          : {
              y: [0, -distance, 0],
            }
      }
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
