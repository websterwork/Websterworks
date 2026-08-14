"use client";

/**
 * -----------------------------------------------------------------------------
 * Waves
 * -----------------------------------------------------------------------------
 *
 * Animated SVG wave background.
 *
 * Features
 * • Configurable colors
 * • Configurable wave count
 * • Configurable opacity
 * • Configurable speed
 * • Configurable height
 * • Optional animation
 * • ClassName support
 *
 * -----------------------------------------------------------------------------
 */

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

export interface WavesProps {
  className?: string;

  /**
   * Wave color.
   */
  color?: string;

  /**
   * Number of layers.
   */
  layers?: number;

  /**
   * Height.
   */
  height?: number;

  /**
   * Overall opacity.
   */
  opacity?: number;

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

export function Waves({
  className,

  color = "currentColor",

  layers = 3,

  height = 180,

  opacity = 0.18,

  duration = 10,

  animated = true,
}: WavesProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden",
        className,
      )}
      style={{ height }}
    >
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {Array.from({ length: layers }).map((_, index) => (
          <motion.path
            key={index}
            d="M0,160L60,149.3C120,139,240,117,360,133.3C480,149,600,203,720,213.3C840,224,960,192,1080,170.7C1200,149,1320,139,1380,133.3L1440,128L1440,320L0,320Z"
            fill={color}
            opacity={opacity / (index + 1)}
            animate={
              animated
                ? {
                    x: [-80 * (index + 1), 80 * (index + 1), -80 * (index + 1)],
                  }
                : undefined
            }
            transition={{
              duration: duration + index * 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
