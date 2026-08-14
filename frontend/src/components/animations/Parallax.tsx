"use client";

/**
 * -----------------------------------------------------------------------------
 * Parallax
 * -----------------------------------------------------------------------------
 *
 * Scroll-based parallax wrapper.
 *
 * Features
 * • Vertical / Horizontal movement
 * • Rotation
 * • Scale
 * • Opacity
 * • Configurable speed
 * • Reverse direction
 * • Viewport based
 *
 * -----------------------------------------------------------------------------
 */

import {
  motion,
  useScroll,
  useTransform,
  type UseScrollOptions,
} from "motion/react";
import { useRef } from "react";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

export interface ParallaxProps {
  children: React.ReactNode;

  className?: string;

  /**
   * Vertical movement.
   */
  y?: number;

  /**
   * Horizontal movement.
   */
  x?: number;

  /**
   * Rotation.
   */
  rotate?: number;

  /**
   * Scale amount.
   */
  scale?: number;

  /**
   * Fade while scrolling.
   */
  fade?: boolean;

  /**
   * Reverse movement.
   */
  reverse?: boolean;

  /**
   * Scroll offsets.
   */
  offset?: UseScrollOptions["offset"];
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function Parallax({
  children,
  className,
  y = 80,
  x = 0,
  rotate = 0,
  scale = 0,
  fade = false,
  reverse = false,
  offset = ["start end", "end start"],
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const multiplier = reverse ? -1 : 1;

  const translateY = useTransform(
    scrollYProgress,
    [0, 1],
    [y * multiplier, -y * multiplier],
  );

  const translateX = useTransform(
    scrollYProgress,
    [0, 1],
    [x * multiplier, -x * multiplier],
  );

  const rotation = useTransform(scrollYProgress, [0, 1], [-rotate, rotate]);

  const scaling = useTransform(scrollYProgress, [0, 1], [1, 1 + scale]);

  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    fade ? [0.4, 1] : [1, 1],
  );

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      style={{
        y: translateY,
        x: translateX,
        rotate: rotation,
        scale: scaling,
        opacity,
      }}
    >
      {children}
    </motion.div>
  );
}
