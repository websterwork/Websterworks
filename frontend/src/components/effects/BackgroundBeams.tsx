"use client";

/**
 * -----------------------------------------------------------------------------
 * Background Beams
 * -----------------------------------------------------------------------------
 *
 * Animated light beam background.
 *
 * Features
 * • Configurable beam count
 * • Configurable colors
 * • Configurable width
 * • Configurable blur
 * • Configurable opacity
 * • Configurable duration
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

export interface BackgroundBeamsProps {
  className?: string;

  /**
   * Number of beams.
   */
  count?: number;

  /**
   * Beam color.
   */
  color?: string;

  /**
   * Beam width.
   */
  width?: number;

  /**
   * Beam opacity.
   */
  opacity?: number;

  /**
   * Blur utility.
   */
  blur?: string;

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

export function BackgroundBeams({
  className,
  count = 6,
  color = "bg-primary",
  width = 2,
  opacity = 0.25,
  blur = "blur-sm",
  animated = true,
  duration = 14,
}: BackgroundBeamsProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {Array.from({ length: count }).map((_, index) => {
        const left = `${(100 / (count + 1)) * (index + 1)}%`;

        return (
          <motion.div
            key={index}
            className={cn("absolute top-[-30%] h-[160%]", color, blur)}
            style={{
              left,
              width,
              opacity,
            }}
            animate={
              animated
                ? {
                    y: ["-10%", "10%", "-10%"],
                    opacity: [opacity * 0.5, opacity, opacity * 0.5],
                    scaleY: [0.9, 1.1, 0.9],
                  }
                : undefined
            }
            transition={{
              duration: duration + index,
              repeat: Infinity,
              ease: cubicBezier.gentle,
              delay: index * 0.5,
            }}
          />
        );
      })}
    </div>
  );
}
