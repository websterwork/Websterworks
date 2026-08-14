"use client";

/**
 * -----------------------------------------------------------------------------
 * BlurText
 * -----------------------------------------------------------------------------
 *
 * Animates text from a blurred state into sharp focus.
 *
 * Features
 * • Blur animation
 * • Fade in
 * • Semantic HTML
 * • Viewport animation
 * • Custom blur amount
 * • Custom transition
 *
 * -----------------------------------------------------------------------------
 */

import { ElementType, ReactNode } from "react";

import { motion, Transition } from "motion/react";

import { cn } from "@/lib/utils";

import { smoothTransition } from "@/lib/motion/transitions";

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

interface BlurTextProps<T extends ElementType = "div"> {
  as?: T;

  children: ReactNode;

  className?: string;

  blur?: number;

  duration?: number;

  delay?: number;

  transition?: Transition;

  once?: boolean;

  amount?: number;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function BlurText<T extends ElementType = "div">({
  as,

  children,

  className,

  blur = 20,

  duration,

  delay = 0,

  transition = smoothTransition,

  once = true,

  amount = 0.2,
}: BlurTextProps<T>) {
  const Component = motion.create(as ?? "div");

  return (
    <Component
      className={cn(className)}
      initial={{
        opacity: 0,
        filter: `blur(${blur}px)`,
      }}
      whileInView={{
        opacity: 1,
        filter: "blur(0px)",
      }}
      viewport={{
        once,
        amount,
      }}
      transition={{
        ...transition,
        delay,
        ...(duration && { duration }),
      }}
    >
      {children}
    </Component>
  );
}
