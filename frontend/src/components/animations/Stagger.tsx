"use client";

/**
 * -----------------------------------------------------------------------------
 * Stagger
 * -----------------------------------------------------------------------------
 *
 * Animates child elements sequentially using Framer Motion's staggerChildren.
 *
 * Responsibilities:
 * • Stagger child animations
 * • Viewport animation
 * • Custom stagger timing
 * • Semantic HTML support
 *
 * -----------------------------------------------------------------------------
 */

import { ElementType, ReactNode } from "react";

import { motion, Transition } from "motion/react";

import { cn } from "@/lib/utils";

interface StaggerProps<T extends ElementType = "div"> {
  as?: T;

  children: ReactNode;

  className?: string;

  delay?: number;

  stagger?: number;

  once?: boolean;

  amount?: number;

  transition?: Transition;
}

export function Stagger<T extends ElementType = "div">({
  as,

  children,

  className,

  delay = 0,

  stagger = 0.12,

  once = true,

  amount = 0.2,

  transition,
}: StaggerProps<T>) {
  const Component = motion.create(as ?? "div");

  return (
    <Component
      className={cn(className)}
      variants={{
        hidden: {},

        visible: {
          transition: {
            delayChildren: delay,

            staggerChildren: stagger,

            ...transition,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        amount,
      }}
    >
      {children}
    </Component>
  );
}
