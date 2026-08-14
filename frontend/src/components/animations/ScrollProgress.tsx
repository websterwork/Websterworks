"use client";

import { motion, useScroll, useSpring } from "motion/react";

import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  className?: string;

  /**
   * Progress bar height.
   */
  height?: number;

  /**
   * Smooth the progress animation.
   */
  smooth?: boolean;

  /**
   * Z-index utility class.
   */
  zIndex?: string;
}

export function ScrollProgress({
  className,
  height = 3,
  smooth = true,
  zIndex = "z-50",
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();

  const progress = smooth
    ? useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        mass: 0.25,
      })
    : scrollYProgress;

  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 right-0 origin-left bg-primary",
        zIndex,
        className,
      )}
      style={{
        scaleX: progress,
        height,
      }}
    />
  );
}
