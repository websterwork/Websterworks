"use client";

/**
 * -----------------------------------------------------------------------------
 * Reveal
 * -----------------------------------------------------------------------------
 *
 * Reveals content by sliding it from behind an overflow-hidden container.
 *
 * Features
 * • Mask reveal animation
 * • Multiple directions
 * • Custom transition
 * • Viewport animation
 * • Semantic HTML element support
 *
 * -----------------------------------------------------------------------------
 */

import { ElementType, ReactNode } from "react";

import { motion, Transition } from "motion/react";

import { cn } from "@/lib/utils";

import { fadeUp, fadeDown, fadeLeft, fadeRight } from "@/lib/motion/variants";

import { smoothTransition } from "@/lib/motion/transitions";

/* -------------------------------------------------------------------------- */
/* Variant Map                                                                */
/* -------------------------------------------------------------------------- */

const variantMap = {
  up: fadeUp,
  down: fadeDown,
  left: fadeLeft,
  right: fadeRight,
} as const;

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

interface RevealProps<T extends ElementType = "div"> {
  as?: T;

  children: ReactNode;

  className?: string;

  direction?: keyof typeof variantMap;

  transition?: Transition;

  delay?: number;

  duration?: number;

  once?: boolean;

  amount?: number;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function Reveal<T extends ElementType = "div">({
  as,

  children,

  className,

  direction = "up",

  transition = smoothTransition,

  delay = 0,

  duration,

  once = true,

  amount = 0.2,
}: RevealProps<T>) {
  const Component = motion.create(as ?? "div");

  return (
    <div className="overflow-hidden">
      <Component
        className={cn(className)}
        variants={variantMap[direction]}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{
          once,
          amount,
        }}
        transition={{
          ...transition,
          delay,
          ...(duration && {
            duration,
          }),
        }}
      >
        {children}
      </Component>
    </div>
  );
}
