"use client";

/**
 * -----------------------------------------------------------------------------
 * Shine
 * -----------------------------------------------------------------------------
 *
 * Animated shine / shimmer wrapper with adaptive dark/light gradient support.
 *
 * -----------------------------------------------------------------------------
 */

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

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

  /**
   * Custom CSS linear-gradient string for complete control.
   */
  shineGradient?: string;
}

export function Shine({
  children,
  className,
  infinite = true,
  hoverOnly = false,
  duration = 2.5,
  width = "30%",
  angle = 20,
  opacity = 0.5,
  shineGradient,
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
            shineGradient ||
            "linear-gradient(to right, transparent, var(--shine-color, rgba(255,255,255,0.8)), transparent)",
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
