"use client";

/**
 * -----------------------------------------------------------------------------
 * Gradient Mesh
 * -----------------------------------------------------------------------------
 *
 * Premium animated gradient mesh background.
 *
 * Features
 * • Configurable colors
 * • Configurable blob size
 * • Configurable opacity
 * • Configurable blur
 * • Configurable animation
 * • Configurable duration
 * • Multiple instances supported
 *
 * -----------------------------------------------------------------------------
 */

import { motion } from "motion/react";

import { cubicBezier } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

export interface GradientMeshProps {
  className?: string;

  animated?: boolean;

  duration?: number;

  opacity?: number;

  blur?: string;

  size?: number;

  primaryColor?: string;

  secondaryColor?: string;

  accentColor?: string;

  fourthColor?: string;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function GradientMesh({
  className,
  animated = true,
  duration = 22,
  opacity = 0.85,
  blur = "blur-[160px]",
  size = 420,
  primaryColor = "bg-cyan-500/30",
  secondaryColor = "bg-violet-500/25",
  accentColor = "bg-blue-500/25",
  fourthColor = "bg-fuchsia-500/20",
}: GradientMeshProps) {
  const blobs = [
    {
      className: `${primaryColor} left-[5%] top-[5%]`,
      x: [0, 70, -30, 0],
      y: [0, 60, -20, 0],
    },
    {
      className: `${secondaryColor} right-[5%] top-[20%]`,
      x: [0, -60, 40, 0],
      y: [0, -70, 30, 0],
    },
    {
      className: `${accentColor} bottom-[5%] left-[30%]`,
      x: [0, 50, -50, 0],
      y: [0, -40, 50, 0],
    },
    {
      className: `${fourthColor} bottom-[15%] right-[20%]`,
      x: [0, -40, 60, 0],
      y: [0, 40, -40, 0],
    },
  ];

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      style={{ opacity }}
    >
      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          className={cn("absolute rounded-full", blur, blob.className)}
          style={{
            width: size,
            height: size,
          }}
          animate={
            animated
              ? {
                  x: blob.x,
                  y: blob.y,
                  scale: [1, 1.08, 0.94, 1],
                }
              : undefined
          }
          transition={{
            repeat: Infinity,
            duration: duration + index * 2,
            ease: cubicBezier.gentle,
          }}
        />
      ))}
    </div>
  );
}
