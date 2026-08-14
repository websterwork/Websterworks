"use client";

/**
 * -----------------------------------------------------------------------------
 * Stars
 * -----------------------------------------------------------------------------
 *
 * Animated star field background.
 *
 * Features
 * • Configurable star count
 * • Configurable size
 * • Configurable color
 * • Configurable opacity
 * • Twinkling animation
 * • Optional animation
 * • ClassName support
 *
 * -----------------------------------------------------------------------------
 */

import { useMemo } from "react";

import { motion } from "motion/react";

import { cubicBezier } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

export interface StarsProps {
  className?: string;

  /**
   * Number of stars.
   */
  count?: number;

  /**
   * Base star size.
   */
  size?: number;

  /**
   * Star color.
   */
  color?: string;

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

export function Stars({
  className,
  count = 120,
  size = 2,
  color = "bg-white",
  opacity = 0.8,
  animated = true,
  duration = 4,
}: StarsProps) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        id: index,

        left: Math.random() * 100,

        top: Math.random() * 100,

        size: size * (0.5 + Math.random() * 1.5),

        opacity: opacity * (0.3 + Math.random() * 0.7),

        delay: Math.random() * duration,

        duration: duration + Math.random() * 4,
      })),
    [count, duration, opacity, size],
  );

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className={cn("absolute rounded-full", color)}
          style={{
            width: star.size,
            height: star.size,
            left: `${star.left}%`,
            top: `${star.top}%`,
            opacity: star.opacity,
          }}
          animate={
            animated
              ? {
                  opacity: [
                    star.opacity * 0.4,
                    star.opacity,
                    star.opacity * 0.5,
                  ],
                  scale: [1, 1.8, 1],
                }
              : undefined
          }
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: star.duration,
            delay: star.delay,
            ease: cubicBezier.gentle,
          }}
        />
      ))}
    </div>
  );
}
