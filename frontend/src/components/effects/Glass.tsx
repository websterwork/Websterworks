"use client";

/**
 * -----------------------------------------------------------------------------
 * Glass
 * -----------------------------------------------------------------------------
 *
 * Generic glassmorphism wrapper.
 *
 * Features
 * • Configurable blur
 * • Configurable opacity
 * • Configurable border
 * • Configurable shadow
 * • Configurable rounded corners
 * • Optional hover animation
 * • ClassName support
 *
 * -----------------------------------------------------------------------------
 */

import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";

import { snappySpringTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

export interface GlassProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;

  className?: string;

  /**
   * Background opacity.
   */
  opacity?: number;

  /**
   * Blur utility class.
   */
  blur?: string;

  /**
   * Border utility class.
   */
  border?: string;

  /**
   * Shadow utility class.
   */
  shadow?: string;

  /**
   * Rounded utility class.
   */
  rounded?: string;

  /**
   * Enable hover animation.
   */
  hover?: boolean;

  /**
   * Hover scale.
   */
  scale?: number;

  /**
   * Hover lift.
   */
  lift?: number;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function Glass({
  children,
  className,

  opacity = 0.7,

  blur = "backdrop-blur-xl",

  border = "border border-white/15 dark:border-white/10",

  shadow = "shadow-2xl shadow-black/10",

  rounded = "rounded-2xl",

  hover = false,

  scale = 1.02,

  lift = -4,

  style,

  ...props
}: GlassProps) {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden",

        "bg-white/10 dark:bg-white/5",

        blur,

        border,

        shadow,

        rounded,

        className,
      )}
      style={{
        ...style,
        backgroundColor: `rgb(255 255 255 / ${opacity * 100}%)`,
      }}
      whileHover={
        hover
          ? {
              scale,
              y: lift,
            }
          : undefined
      }
      transition={snappySpringTransition}
      {...props}
    >
      {children}
    </motion.div>
  );
}
