"use client";

/**
 * -----------------------------------------------------------------------------
 * Cursor Glow
 * -----------------------------------------------------------------------------
 *
 * Floating cursor glow effect.
 *
 * Features
 * • Mouse tracking
 * • Smooth spring animation
 * • Configurable size
 * • Configurable color
 * • Configurable blur
 * • Configurable opacity
 * • Optional scale on hover
 *
 * -----------------------------------------------------------------------------
 */

import { useRef } from "react";

import { motion, useMotionValue, useSpring } from "motion/react";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

interface CursorGlowProps {
  children: React.ReactNode;

  className?: string;

  /**
   * Glow diameter.
   */
  size?: number;

  /**
   * Glow color.
   */
  color?: string;

  /**
   * Glow opacity.
   */
  opacity?: number;

  /**
   * Blur amount.
   */
  blur?: number;

  /**
   * Disable glow.
   */
  disabled?: boolean;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function CursorGlow({
  children,
  className,
  size = 220,
  color = "var(--primary)",
  opacity = 0.18,
  blur = 60,
  disabled = false,
}: CursorGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const x = useSpring(mouseX, {
    stiffness: 220,
    damping: 30,
    mass: 0.5,
  });

  const y = useSpring(mouseY, {
    stiffness: 220,
    damping: 30,
    mass: 0.5,
  });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (disabled || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }

  function handleMouseLeave() {
    mouseX.set(-1000);
    mouseY.set(-1000);
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {!disabled && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full"
          style={{
            width: size,
            height: size,
            left: 0,
            top: 0,
            x,
            y,
            translateX: "-50%",
            translateY: "-50%",
            background: color,
            opacity,
            filter: `blur(${blur}px)`,
          }}
        />
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
