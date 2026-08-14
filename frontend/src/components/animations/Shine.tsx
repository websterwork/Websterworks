"use client";

/**
 * -----------------------------------------------------------------------------
 * Shine
 * -----------------------------------------------------------------------------
 *
 * Animated shine / shimmer wrapper.
 *
 * Features
 * • Infinite or hover-only shine
 * • Configurable duration
 * • Configurable angle
 * • Configurable width
 * • Configurable opacity
 * • Overflow hidden
 *
 * -----------------------------------------------------------------------------
 */

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

interface ShineProps {
  children: React.ReactNode;

  className?: string;

  /**
   * Run continuously.
   */
  infinite?: boolean;

  /**
   * Run only on hover.
   */
  hoverOnly?: boolean;

  /**
   * Duration.
   */
  duration?: number;

  /**
   * Shine width.
   */
  width?: string;

  /**
   * Shine angle.
   */
  angle?: number;

  /**
   * Opacity.
   */
  opacity?: number;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function Shine({
  children,
  className,
  infinite = true,
  hoverOnly = false,
  duration = 2.5,
  width = "30%",
  angle = 20,
  opacity = 0.5,
}: ShineProps) {
  const animation = {
    x: ["-150%", "250%"],
  };

  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      initial="initial"
      whileHover={hoverOnly ? "hover" : undefined}
    >
      {children}

      <motion.div
        className="pointer-events-none absolute inset-y-0 left-0"
        style={{
          width,
          rotate: `${angle}deg`,
          opacity,
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.9), transparent)",
        }}
        variants={{
          initial: {
            x: "-150%",
          },
          hover: animation,
        }}
        animate={infinite ? animation : undefined}
        transition={{
          repeat: infinite ? Infinity : 0,
          repeatDelay: 1,
          duration,
          ease: "linear",
        }}
      />
    </motion.div>
  );
}
