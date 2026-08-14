"use client";

/**
 * -----------------------------------------------------------------------------
 * Hover Card
 * -----------------------------------------------------------------------------
 *
 * Premium hover interaction wrapper.
 *
 * Features
 * • Scale
 * • Lift
 * • Rotate
 * • Shadow
 * • Configurable spring animation
 *
 * -----------------------------------------------------------------------------
 */

import { motion, type HTMLMotionProps } from "motion/react";

import { cn } from "@/lib/utils";
import { snappySpringTransition } from "@/lib/motion";

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

interface HoverCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;

  className?: string;

  /**
   * Hover scale.
   */
  scale?: number;

  /**
   * Lift amount.
   */
  lift?: number;

  /**
   * Rotation.
   */
  rotate?: number;

  /**
   * Enable hover shadow.
   */
  shadow?: boolean;

  /**
   * Disable hover effect.
   */
  disabled?: boolean;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function HoverCard({
  children,
  className,
  scale = 1.03,
  lift = -8,
  rotate = 0,
  shadow = true,
  disabled = false,
  ...props
}: HoverCardProps) {
  return (
    <motion.div
      className={cn(
        shadow &&
          "transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/10",
        className,
      )}
      whileHover={
        disabled
          ? undefined
          : {
              scale,
              y: lift,
              rotate,
            }
      }
      transition={snappySpringTransition}
      {...props}
    >
      {children}
    </motion.div>
  );
}
