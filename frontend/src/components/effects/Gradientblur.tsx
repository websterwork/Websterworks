"use client";

/**
 * -----------------------------------------------------------------------------
 * Gradient Blur
 * -----------------------------------------------------------------------------
 *
 * Premium blurred gradient effect.
 *
 * Features
 * • Configurable colors
 * • Configurable direction
 * • Configurable size
 * • Configurable blur
 * • Configurable opacity
 * • Optional floating animation
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

export interface GradientBlurProps {
  className?: string;

  /**
   * Gradient direction.
   */
  direction?: keyof typeof gradientDirections;

  /**
   * Gradient start color.
   */
  from?: string;

  /**
   * Gradient middle color.
   */
  via?: string;

  /**
   * Gradient end color.
   */
  to?: string;

  /**
   * Width in pixels.
   */
  width?: number;

  /**
   * Height in pixels.
   */
  height?: number;

  /**
   * Blur utility class.
   */
  blur?: string;

  /**
   * Overall opacity.
   */
  opacity?: number;

  /**
   * Enable floating animation.
   */
  animated?: boolean;

  /**
   * Animation duration.
   */
  duration?: number;

  /**
   * Border radius utility class.
   */
  rounded?: string;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function GradientBlur({
  className,
  direction = "to-r",
  from = "from-cyan-500/40",
  via = "via-violet-500/35",
  to = "to-transparent",
  width = 600,
  height = 600,
  blur = "blur-[140px]",
  opacity = 0.8,
  animated = true,
  duration = 12,
  rounded = "rounded-full",
}: GradientBlurProps) {
  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute",
        gradientDirections[direction],
        from,
        via,
        to,
        blur,
        rounded,
        className,
      )}
      style={{
        width,
        height,
        opacity,
      }}
      animate={
        animated
          ? {
              x: [0, 24, -18, 0],
              y: [0, -20, 14, 0],
              scale: [1, 1.05, 0.96, 1],
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
