"use client";

/**
 * -----------------------------------------------------------------------------
 * SplitText
 * -----------------------------------------------------------------------------
 *
 * Splits text into words or characters and animates each piece individually.
 *
 * Features
 * • Word animation
 * • Character animation
 * • Custom variants
 * • Custom transitions
 * • Viewport animation
 * • Semantic HTML support
 * • Supports both `children` and `text` props
 *
 * -----------------------------------------------------------------------------
 */

import { ElementType } from "react";

import { motion, Transition, Variants } from "motion/react";

import { cn } from "@/lib/utils";

import {
  fadeUp,
  fadeDown,
  fadeLeft,
  fadeRight,
  fade,
  zoom,
  scale,
} from "@/lib/motion/variants";

import { smoothTransition } from "@/lib/motion/transitions";

/* -------------------------------------------------------------------------- */
/* Variant Map                                                                */
/* -------------------------------------------------------------------------- */

const animationMap = {
  fade,
  up: fadeUp,
  down: fadeDown,
  left: fadeLeft,
  right: fadeRight,
  zoom,
  scale,
} satisfies Record<string, Variants>;

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

interface SplitTextProps<T extends ElementType = "div"> {
  children?: string;

  text?: string;

  as?: T;

  className?: string;

  by?: "word" | "char";

  animation?: keyof typeof animationMap;

  stagger?: number;

  delay?: number;

  duration?: number;

  transition?: Transition;

  once?: boolean;

  amount?: number;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function SplitText<T extends ElementType = "div">({
  children,

  text,

  as,

  className,

  by = "word",

  animation = "up",

  stagger = 0.05,

  delay = 0,

  duration,

  transition = smoothTransition,

  once = true,

  amount = 0.2,
}: SplitTextProps<T>) {
  const Component = motion.create(as ?? "div");

  const content = text ?? children ?? "";

  const pieces = by === "word" ? content.split(" ") : content.split("");

  return (
    <Component
      className={cn("flex flex-wrap", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        amount,
      }}
      transition={{
        staggerChildren: stagger,
        delayChildren: delay,
      }}
    >
      {pieces.map((piece, index) => (
        <motion.span
          key={`${piece}-${index}`}
          variants={animationMap[animation]}
          transition={{
            ...transition,
            ...(duration && {
              duration,
            }),
          }}
          className="inline-block"
        >
          {piece === " " ? "\u00A0" : piece}
          {by === "word" && index !== pieces.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </Component>
  );
}
