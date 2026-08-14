"use client";

import { motion, type HTMLMotionProps } from "motion/react";

import { cn } from "@/lib/utils";

interface TextGradientProps extends HTMLMotionProps<"span"> {
  children: React.ReactNode;

  className?: string;

  /**
   * Animate gradient.
   */
  animated?: boolean;

  /**
   * Tailwind gradient classes.
   */
  gradient?: string;
}

export function TextGradient({
  children,
  className,
  animated = true,
  gradient = "from-primary via-accent to-primary",
  ...props
}: TextGradientProps) {
  return (
    <motion.span
      className={cn(
        "inline-block bg-gradient-to-r bg-[length:200%_200%] bg-clip-text text-transparent",
        gradient,
        className,
      )}
      animate={
        animated
          ? {
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }
          : undefined
      }
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "linear",
      }}
      {...props}
    >
      {children}
    </motion.span>
  );
}
