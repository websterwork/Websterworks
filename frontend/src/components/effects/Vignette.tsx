"use client";

/**
 * -----------------------------------------------------------------------------
 * Vignette
 * -----------------------------------------------------------------------------
 *
 * Radial vignette overlay.
 *
 * Features
 * • Configurable color
 * • Configurable opacity
 * • Configurable size
 * • Configurable blur
 * • Configurable center
 * • ClassName support
 *
 * -----------------------------------------------------------------------------
 */

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

export interface VignetteProps {
  className?: string;

  /**
   * Vignette color.
   */
  color?: string;

  /**
   * Overall opacity.
   */
  opacity?: number;

  /**
   * Radius of the clear center.
   *
   * Example:
   * 40 = 40%
   */
  size?: number;

  /**
   * Blur amount.
   */
  blur?: string;

  /**
   * Gradient center.
   */
  center?: string;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function Vignette({
  className,

  color = "0 0 0",

  opacity = 0.6,

  size = 45,

  blur = "",

  center = "center",
}: VignetteProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", blur, className)}
      style={{
        background: `radial-gradient(
          circle at ${center},
          transparent ${size}%,
          rgb(${color} / ${opacity}) 100%
        )`,
      }}
    />
  );
}
