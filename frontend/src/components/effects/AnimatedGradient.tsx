"use client";

/**
 * -----------------------------------------------------------------------------
 * Animated Gradient
 * -----------------------------------------------------------------------------
 *
 * Animated gradient background.
 *
 * Features
 * • Configurable colors
 * • Configurable direction
 * • Configurable opacity
 * • Configurable duration
 * • Configurable background size
 * • Optional animation
 * • ClassName support
 *
 * -----------------------------------------------------------------------------
 */

import { motion } from "motion/react";

import { cubicBezier } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Gradient Directions                                                        */
/* -------------------------------------------------------------------------- */

const gradientDirections = {
  "to-r": "bg-gradient-to-r",
  "to-l": "bg-gradient-to-l",
  "to-t": "bg-gradient-to-t",
  "to-b": "bg-gradient-to-b",
  "to-tr": "bg-gradient-to-tr",
  "to-tl": "bg-gradient-to-tl",
  "to-br": "bg-gradient-to-br",
  "to-bl": "bg-gradient-to-bl",
} as const;

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

export interface AnimatedGradientProps {
  className?: string;

  /**
   * Gradient direction.
   */
  direction?: keyof typeof gradientDirections;

  /**
   * Gradient colors.
   */
  from?: string;
  via?: string;
  to?: string;

  /**
   * Background size.
   *
   * Example:
   * "200% 200%"
   */
  backgroundSize?: string;

  /**
   * Overall opacity.
   */
  opacity?: number;

  /**
   * Enable animation.
   */
  animated?: boolean;

  /**
   * Animation duration.
   */
  duration?: number;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function AnimatedGradient({
  className,
  direction = "to-r",
  from = "from-primary/30",
  via = "via-accent/25",
  to = "to-background",
  backgroundSize = "200% 200%",
  opacity = 1,
  animated = true,
  duration = 12,
}: AnimatedGradientProps) {
  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute inset-0",
        gradientDirections[direction],
        from,
        via,
        to,
        className,
      )}
      style={{
        opacity,
        backgroundSize,
      }}
      animate={
        animated
          ? {
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }
          : undefined
      }
      transition={{
        duration,
        repeat: Infinity,
        ease: cubicBezier.gentle,
      }}
    />
  );
}
