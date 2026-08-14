"use client";

/**
 * -----------------------------------------------------------------------------
 * FadeIn
 * -----------------------------------------------------------------------------
 *
 * Generic reusable animation wrapper.
 *
 * Features
 * • Fade
 * • Slide
 * • Scale
 * • Zoom
 * • Rotate
 * • Custom transition
 * • Viewport animation
 * • Semantic HTML element support
 *
 * -----------------------------------------------------------------------------
 */

import { ElementType, ReactNode } from "react";

import { motion, Transition } from "motion/react";

import { cn } from "@/lib/utils";

import {
  fade,
  fadeDown,
  fadeLeft,
  fadeRight,
  fadeUp,
  rotate,
  scale,
  zoom,
} from "@/lib/motion/variants";

import { smoothTransition } from "@/lib/motion/transitions";

/* -------------------------------------------------------------------------- */
/* Variant Map                                                                */
/* -------------------------------------------------------------------------- */

const variantMap = {
  fade,
  up: fadeUp,
  down: fadeDown,
  left: fadeLeft,
  right: fadeRight,
  scale,
  zoom,
  rotate,
} as const;

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

interface FadeInProps<T extends ElementType = "div"> {
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

export function FadeIn<T extends ElementType = "div">({
  as,

  children,

  className,

  direction = "up",

  transition = smoothTransition,

  delay = 0,

  duration,

  once = true,

  amount = 0.2,
}: FadeInProps<T>) {
  const Component = motion.create(as ?? "div");

  return (
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
  );
}
