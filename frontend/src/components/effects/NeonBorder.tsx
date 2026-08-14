"use client";

/**
 * -----------------------------------------------------------------------------
 * Neon Border
 * -----------------------------------------------------------------------------
 *
 * Premium glowing border wrapper.
 *
 * Features
 * • Configurable border radius
 * • Configurable thickness
 * • Configurable glow color
 * • Configurable opacity
 * • Optional pulse animation
 * • ClassName support
 *
 * -----------------------------------------------------------------------------
 */

import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";

import { cubicBezier } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

export interface NeonBorderProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;

  className?: string;

  /**
   * Glow color.
   */
  color?: string;

  /**
   * Border thickness.
   */
  thickness?: number;

  /**
   * Border radius utility.
   */
  rounded?: string;

  /**
   * Glow opacity.
   */
  opacity?: number;

  /**
   * Enable pulse animation.
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

export function NeonBorder({
  children,

  className,

  color = "rgb(0,240,255)",

  thickness = 1,

  rounded = "rounded-2xl",

  opacity = 0.8,

  animated = true,

  duration = 3,

  ...props
}: NeonBorderProps) {
  return (
    <motion.div
      className={cn("relative overflow-hidden", rounded, className)}
      animate={
        animated
          ? {
              boxShadow: [
                `0 0 8px ${color}`,
                `0 0 24px ${color}`,
                `0 0 8px ${color}`,
              ],
            }
          : undefined
      }
      transition={{
        repeat: Infinity,
        duration,
        ease: cubicBezier.gentle,
      }}
      style={{
        border: `${thickness}px solid ${color}`,
        opacity,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
