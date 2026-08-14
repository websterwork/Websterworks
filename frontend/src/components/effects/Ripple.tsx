"use client";

/**
 * -----------------------------------------------------------------------------
 * Ripple
 * -----------------------------------------------------------------------------
 *
 * Expanding ripple animation.
 *
 * Features
 * • Configurable color
 * • Configurable size
 * • Configurable duration
 * • Configurable opacity
 * • Multiple ripples
 * • Optional animation
 * • ClassName support
 *
 * -----------------------------------------------------------------------------
 */

import { motion } from "motion/react";

import { cubicBezier } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

export interface RippleProps {
  className?: string;

  /**
   * Ripple color.
   */
  color?: string;

  /**
   * Ripple size.
   */
  size?: number;

  /**
   * Number of ripples.
   */
  count?: number;

  /**
   * Delay between ripples.
   */
  delay?: number;

  /**
   * Animation duration.
   */
  duration?: number;

  /**
   * Starting opacity.
   */
  opacity?: number;

  /**
   * Border width.
   */
  borderWidth?: number;

  /**
   * Enable animation.
   */
  animated?: boolean;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function Ripple({
  className,

  color = "rgb(0,240,255)",

  size = 300,

  count = 3,

  delay = 0.8,

  duration = 3,

  opacity = 0.35,

  borderWidth = 2,

  animated = true,
}: RippleProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden",
        className,
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: size,
            height: size,
            border: `${borderWidth}px solid ${color}`,
          }}
          animate={
            animated
              ? {
                  scale: [0, 1],
                  opacity: [opacity, 0],
                }
              : undefined
          }
          transition={{
            duration,
            repeat: Infinity,
            ease: cubicBezier.gentle,
            delay: index * delay,
          }}
        />
      ))}
    </div>
  );
}
