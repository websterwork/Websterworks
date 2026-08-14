"use client";

/**
 * -----------------------------------------------------------------------------
 * Aurora
 * -----------------------------------------------------------------------------
 *
 * Premium animated aurora background.
 *
 * Features
 * • Configurable colors
 * • Configurable blob sizes
 * • Configurable blur
 * • Configurable opacity
 * • Configurable animation speed
 * • Pause animation
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

export interface AuroraProps {
  className?: string;

  /**
   * Show animation.
   */
  animated?: boolean;

  /**
   * Overall opacity.
   */
  opacity?: number;

  /**
   * Animation duration.
   */
  duration?: number;

  /**
   * Blur utility class.
   */
  blur?: string;

  /**
   * Primary blob color.
   */
  primaryColor?: string;

  /**
   * Secondary blob color.
   */
  secondaryColor?: string;

  /**
   * Accent blob color.
   */
  accentColor?: string;

  /**
   * Blob size.
   */
  size?: number;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function Aurora({
  className,
  animated = true,
  opacity = 0.9,
  duration = 18,
  blur = "blur-[140px]",
  primaryColor = "bg-cyan-500/30",
  secondaryColor = "bg-violet-500/25",
  accentColor = "bg-sky-500/25",
  size = 32,
}: AuroraProps) {
  const blob = `${size}rem`;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      style={{ opacity }}
    >
      {/* ------------------------------------------------------------------ */}
      {/* Primary                                                            */}
      {/* ------------------------------------------------------------------ */}

      <motion.div
        className={cn(
          "absolute left-[-15%] top-[-15%] rounded-full",
          blur,
          primaryColor,
        )}
        style={{
          width: blob,
          height: blob,
        }}
        animate={
          animated
            ? {
                x: [0, 120, -40, 0],
                y: [0, 80, -60, 0],
                scale: [1, 1.15, 0.95, 1],
              }
            : undefined
        }
        transition={{
          duration,
          repeat: Infinity,
          ease: cubicBezier.gentle,
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Secondary                                                          */}
      {/* ------------------------------------------------------------------ */}

      <motion.div
        className={cn(
          "absolute right-[-10%] top-[10%] rounded-full",
          blur,
          secondaryColor,
        )}
        style={{
          width: `${size - 4}rem`,
          height: `${size - 4}rem`,
        }}
        animate={
          animated
            ? {
                x: [0, -100, 60, 0],
                y: [0, -80, 40, 0],
                scale: [1, 0.9, 1.2, 1],
              }
            : undefined
        }
        transition={{
          duration: duration + 5,
          repeat: Infinity,
          ease: cubicBezier.smooth,
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Accent                                                             */}
      {/* ------------------------------------------------------------------ */}

      <motion.div
        className={cn(
          "absolute bottom-[-10%] left-1/2 -translate-x-1/2 rounded-full",
          blur,
          accentColor,
        )}
        style={{
          width: `${size - 8}rem`,
          height: `${size - 8}rem`,
        }}
        animate={
          animated
            ? {
                x: [0, 70, -60, 0],
                y: [0, -40, 50, 0],
                scale: [1, 1.2, 0.9, 1],
              }
            : undefined
        }
        transition={{
          duration: duration + 8,
          repeat: Infinity,
          ease: cubicBezier.premium,
        }}
      />
    </div>
  );
}
