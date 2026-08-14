"use client";

/**
 * -----------------------------------------------------------------------------
 * Morphing Blob
 * -----------------------------------------------------------------------------
 *
 * Animated decorative gradient blob.
 *
 * Features
 * • Floating motion
 * • Morphing border radius
 * • Rotation
 * • Configurable size
 * • Configurable colors
 * • Configurable blur
 * • Configurable opacity
 * • Infinite animation
 *
 * -----------------------------------------------------------------------------
 */

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

interface MorphingBlobProps {
  className?: string;

  /**
   * Blob size.
   */
  size?: number;

  /**
   * Primary color.
   */
  color?: string;

  /**
   * Secondary color.
   */
  secondaryColor?: string;

  /**
   * Blur amount.
   */
  blur?: number;

  /**
   * Opacity.
   */
  opacity?: number;

  /**
   * Animation duration.
   */
  duration?: number;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function MorphingBlob({
  className,
  size = 420,
  color = "var(--primary)",
  secondaryColor = "var(--accent)",
  blur = 80,
  opacity = 0.35,
  duration = 20,
}: MorphingBlobProps) {
  return (
    <motion.div
      className={cn("pointer-events-none absolute rounded-full", className)}
      style={{
        width: size,
        height: size,
        opacity,
        filter: `blur(${blur}px)`,
        background: `radial-gradient(circle at 30% 30%, ${color}, ${secondaryColor})`,
      }}
      animate={{
        x: [0, 80, -60, 0],
        y: [0, -60, 50, 0],
        rotate: [0, 120, 240, 360],
        borderRadius: [
          "42% 58% 63% 37% / 41% 44% 56% 59%",
          "63% 37% 42% 58% / 53% 36% 64% 47%",
          "47% 53% 35% 65% / 40% 60% 40% 60%",
          "42% 58% 63% 37% / 41% 44% 56% 59%",
        ],
        scale: [1, 1.08, 0.94, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
