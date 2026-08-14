"use client";

/**
 * -----------------------------------------------------------------------------
 * Glow
 * -----------------------------------------------------------------------------
 *
 * Reusable radial glow effect.
 *
 * Features
 * • Configurable size
 * • Configurable color
 * • Configurable opacity
 * • Configurable blur
 * • Optional animation
 * • Multiple instances supported
 *
 * -----------------------------------------------------------------------------
 */

import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { cubicBezier } from "@/lib/motion";

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

export interface GlowProps {
  className?: string;

  /**
   * Glow color.
   */
  color?: string;

  /**
   * Glow size.
   */
  size?: number;

  /**
   * Blur utility class.
   */
  blur?: string;

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

export function Glow({
  className,
  color = "bg-primary",
  size = 320,
  blur = "blur-[120px]",
  opacity = 0.35,
  animated = true,
  duration = 6,
}: GlowProps) {
  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute rounded-full",
        color,
        blur,
        className,
      )}
      style={{
        width: size,
        height: size,
        opacity,
      }}
      animate={
        animated
          ? {
              scale: [1, 1.12, 1],
              opacity: [opacity, opacity * 1.25, opacity],
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
