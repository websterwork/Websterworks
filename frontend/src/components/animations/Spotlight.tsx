"use client";

/**
 * -----------------------------------------------------------------------------
 * Spotlight
 * -----------------------------------------------------------------------------
 *
 * Mouse-following spotlight effect.
 *
 * Features
 * • Mouse tracking
 * • Smooth animation
 * • Configurable size
 * • Configurable color
 * • Configurable opacity
 * • Reusable wrapper
 *
 * -----------------------------------------------------------------------------
 */

import { useRef } from "react";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

interface SpotlightProps {
  children: React.ReactNode;

  className?: string;

  /**
   * Spotlight size.
   */
  size?: number;

  /**
   * Spotlight color.
   */
  color?: string;

  /**
   * Spotlight opacity.
   */
  opacity?: number;

  /**
   * Disable spotlight.
   */
  disabled?: boolean;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function Spotlight({
  children,
  className,
  size = 300,
  color = "var(--primary)",
  opacity = 0.18,
  disabled = false,
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (disabled || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }

  function handleMouseLeave() {
    mouseX.set(-9999);
    mouseY.set(-9999);
  }

  const background = useMotionTemplate`
    radial-gradient(
      ${size}px circle at ${mouseX}px ${mouseY}px,
      ${color},
      transparent 70%
    )
  `;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative overflow-hidden rounded-xl", className)}
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background,
          opacity,
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
