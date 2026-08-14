"use client";

/**
 * -----------------------------------------------------------------------------
 * HoverScale
 * -----------------------------------------------------------------------------
 *
 * Reusable hover interaction wrapper.
 *
 * Responsibilities:
 * • Hover scale
 * • Tap scale
 * • Reusable interaction animation
 * • Semantic HTML support
 *
 * -----------------------------------------------------------------------------
 */

import { ElementType, ReactNode } from "react";

import { motion, Transition } from "motion/react";

import { cn } from "@/lib/utils";

import { hoverTransition } from "@/lib/motion/transitions";

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

interface HoverScaleProps<T extends ElementType = "div"> {
  as?: T;

  children: ReactNode;

  className?: string;

  hoverScale?: number;

  tapScale?: number;

  transition?: Transition;

  disabled?: boolean;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function HoverScale<T extends ElementType = "div">({
  as,

  children,

  className,

  hoverScale = 1.03,

  tapScale = 0.98,

  transition = hoverTransition,

  disabled = false,
}: HoverScaleProps<T>) {
  const Component = motion.create(as ?? "div");

  return (
    <Component
      className={cn(className)}
      whileHover={disabled ? undefined : { scale: hoverScale }}
      whileTap={disabled ? undefined : { scale: tapScale }}
      transition={transition}
    >
      {children}
    </Component>
  );
}
