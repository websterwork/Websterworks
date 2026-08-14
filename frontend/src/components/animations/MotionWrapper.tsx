"use client";

/**
 * -----------------------------------------------------------------------------
 * Motion Wrapper
 * -----------------------------------------------------------------------------
 *
 * Base wrapper for all motion components.
 *
 * Features
 * • Custom variants
 * • Initial / Animate / Exit
 * • whileInView support
 * • Viewport configuration
 * • Delay
 * • Transition override
 * • asChild replacement via "as"
 * • Forward Motion props
 *
 * -----------------------------------------------------------------------------
 */

import {
  motion,
  type HTMLMotionProps,
  type Variants,
  type Transition,
} from "motion/react";

import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

interface MotionWrapperProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;

  className?: string;

  /**
   * Animation variants.
   */
  variants?: Variants;

  /**
   * Animate only once.
   */
  once?: boolean;

  /**
   * Viewport amount.
   */
  amount?: number;

  /**
   * Delay animation.
   */
  delay?: number;

  /**
   * Transition override.
   */
  transition?: Transition;

  /**
   * Disable animation.
   */
  disabled?: boolean;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function MotionWrapper({
  children,
  className,
  variants = fadeUp,
  once = true,
  amount = 0.2,
  delay,
  transition,
  disabled = false,
  ...props
}: MotionWrapperProps) {
  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{
        once,
        amount,
      }}
      transition={
        delay !== undefined
          ? {
              delay,
              ...transition,
            }
          : transition
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}
