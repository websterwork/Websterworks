"use client";

/**
 * -----------------------------------------------------------------------------
 * Spotlight
 * -----------------------------------------------------------------------------
 *
 * Interactive spotlight that follows the mouse cursor.
 *
 * Features
 * • Mouse tracking
 * • Radial gradient
 * • Adjustable size
 * • Adjustable opacity
 * • Smooth interpolation
 * • Pointer events disabled
 *
 * -----------------------------------------------------------------------------
 */

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { useMousePosition } from "@/hooks";

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

interface SpotlightProps {
  /**
   * Spotlight diameter.
   *
   * @default 600
   */
  size?: number;

  /**
   * Spotlight opacity.
   *
   * @default 0.18
   */
  opacity?: number;

  /**
   * Spotlight color.
   *
   * @default "var(--primary)"
   */
  color?: string;

  /**
   * Additional classes.
   */
  className?: string;

  /**
   * Animation smoothing.
   *
   * 0 - 1
   *
   * @default 0.12
   */
  smoothing?: number;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function Spotlight({
  size = 600,
  opacity = 0.18,
  color = "var(--primary)",
  smoothing = 0.12,
  className,
}: SpotlightProps) {
  const { x, y } = useMousePosition();

  const [position, setPosition] = useState({
    x,
    y,
  });

  useEffect(() => {
    let frame: number;

    const animate = () => {
      setPosition((previous) => ({
        x: previous.x + (x - previous.x) * smoothing,
        y: previous.y + (y - previous.y) * smoothing,
      }));

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [x, y, smoothing]);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div
        className="absolute rounded-full blur-3xl transition-[width,height]"
        style={{
          width: size,
          height: size,
          left: position.x - size / 2,
          top: position.y - size / 2,
          opacity,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}
