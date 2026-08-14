"use client";

/**
 * -----------------------------------------------------------------------------
 * Motion Section
 * -----------------------------------------------------------------------------
 *
 * Animated page section wrapper.
 *
 * Features
 * • Section wrapper
 * • Reveal on scroll
 * • Child staggering
 * • Configurable HTML element
 * • Viewport animation
 * • Optional animation disable
 *
 * -----------------------------------------------------------------------------
 */
import React from "react";
import { motion, type HTMLMotionProps, type Variants } from "motion/react";

import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

type HTMLElementTag = keyof HTMLElementTagNameMap;

export interface MotionSectionProps extends HTMLMotionProps<"section"> {
  children: React.ReactNode;
  className?: string;

  /**
   * Root variants.
   */
  variants?: Variants;

  /**
   * Children variants.
   */
  childVariants?: Variants;

  /**
   * Animate once.
   */
  once?: boolean;

  /**
   * Viewport amount.
   */
  amount?: number;

  /**
   * Disable animations.
   */
  disabled?: boolean;

  /**
   * HTML element.
   */
  as?: HTMLElementTag;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function MotionSection({
  children,
  className,
  variants = staggerContainer,
  childVariants = fadeUp,
  once = true,
  amount = 0.2,
  disabled = false,
  as = "section",
  ...props
}: MotionSectionProps) {
  if (disabled) {
    // Cast Component as an HTML container component that accepts React children
    const Component = as as unknown as React.ComponentType<
      React.HTMLAttributes<HTMLElement>
    >;

    return <Component className={className}>{children}</Component>;
  }

  // Cast motion.create to avoid union parameter mismatches on Motion props
  const MotionComponent = motion.create(as) as unknown as React.ComponentType<
    HTMLMotionProps<"section">
  >;

  return (
    <MotionComponent
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        amount,
      }}
      {...props}
    >
      {React.Children.map(children, (child, index) =>
        React.isValidElement(child) ? (
          <motion.div key={child.key ?? index} variants={childVariants}>
            {child}
          </motion.div>
        ) : (
          child
        ),
      )}
    </MotionComponent>
  );
}
