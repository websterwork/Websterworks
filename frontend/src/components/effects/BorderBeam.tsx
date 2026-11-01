// src/components/animations/BorderBeam.tsx
"use client";

/**
 * -----------------------------------------------------------------------------
 * Border Beam
 * -----------------------------------------------------------------------------
 */

import { useId } from "react";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface BorderBeamProps extends HTMLMotionProps<"div"> {
  children?: React.ReactNode;
  className?: string;
  color?: string;
  colorFrom?: string;
  colorTo?: string;
  size?: number;
  radius?: number;
  strokeWidth?: number;
  duration?: number;
  animated?: boolean;
}

export function BorderBeam({
  children,
  className,
  color = "#9810fa",
  colorFrom = "transparent",
  colorTo = "#9810fa",
  size = 200,
  radius = 20,
  strokeWidth = 2,
  duration = 5,
  animated = true,
  ...props
}: BorderBeamProps) {
  const id = useId();
  const primaryColor = color || colorTo;

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
            <stop offset="0%" stopColor={colorFrom} />
            <stop offset="50%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={colorTo} />
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
          strokeDasharray={`${size} 900`}
          animate={
            animated
              ? {
                  strokeDashoffset: [0, -(size + 900)],
                }
              : undefined
          }
          transition={{
            duration,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{
            filter: `drop-shadow(0 0 8px ${primaryColor})`,
          }}
        />
      </svg>
    </motion.div>
  );
}