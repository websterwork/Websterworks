"use client";

/**
 * -----------------------------------------------------------------------------
 * Border Beam
 * -----------------------------------------------------------------------------
 *
 * Animated SVG border beam.
 *
 * Features
 * • SVG path animation
 * • Rounded corners
 * • Configurable color
 * • Configurable duration
 * • Configurable stroke width
 * • Configurable border radius
 * • Optional animation
 * • ClassName support
 *
 * -----------------------------------------------------------------------------
 */

import { useId } from "react";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

export interface BorderBeamProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;

  className?: string;

  /**
   * Beam color.
   */
  color?: string;

  /**
   * Border radius in px.
   */
  radius?: number;

  /**
   * Stroke width.
   */
  strokeWidth?: number;

  /**
   * Animation duration.
   */
  duration?: number;

  /**
   * Enable animation.
   */
  animated?: boolean;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function BorderBeam({
  children,
  className,

  color = "#00F0FF",

  radius = 20,

  strokeWidth = 2,

  duration = 5,

  animated = true,

  ...props
}: BorderBeamProps) {
  const id = useId();

  return (
    <motion.div
      className={cn("relative overflow-hidden rounded-[inherit]", className)}
      {...props}
    >
      {children}

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />

            <stop offset="50%" stopColor={color} />

            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Base Border */}

        <rect
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width={`calc(100% - ${strokeWidth}px)`}
          height={`calc(100% - ${strokeWidth}px)`}
          rx={radius}
          ry={radius}
          fill="none"
          stroke="rgba(255,255,255,.08)"
          strokeWidth={strokeWidth}
        />

        {/* Animated Beam */}

        <motion.rect
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width={`calc(100% - ${strokeWidth}px)`}
          height={`calc(100% - ${strokeWidth}px)`}
          rx={radius}
          ry={radius}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray="140 900"
          animate={
            animated
              ? {
                  strokeDashoffset: [0, -1040],
                }
              : undefined
          }
          transition={{
            duration,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{
            filter: `drop-shadow(0 0 8px ${color})`,
          }}
        />
      </svg>
    </motion.div>
  );
}
