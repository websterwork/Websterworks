"use client";

/**
 * -----------------------------------------------------------------------------
 * Dot Pattern
 * -----------------------------------------------------------------------------
 *
 * Premium SVG dot background.
 *
 * Features
 * • Multiple instances supported (useId)
 * • Configurable spacing
 * • Configurable radius
 * • Configurable color
 * • Configurable opacity
 * • Optional radial fade
 * • ClassName support
 *
 * -----------------------------------------------------------------------------
 */

import { useId } from "react";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

export interface DotPatternProps {
  className?: string;

  /**
   * Distance between dots.
   */
  spacing?: number;

  /**
   * Dot radius.
   */
  radius?: number;

  /**
   * Dot color.
   */
  color?: string;

  /**
   * Dot opacity.
   */
  opacity?: number;

  /**
   * Enable radial fade.
   */
  fade?: boolean;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function DotPattern({
  className,
  spacing = 28,
  radius = 1.5,
  color = "currentColor",
  opacity = 0.12,
  fade = true,
}: DotPatternProps) {
  const id = useId();

  const patternId = `${id}-pattern`;
  const gradientId = `${id}-gradient`;
  const maskId = `${id}-mask`;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id={patternId}
            width={spacing}
            height={spacing}
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx={spacing / 2}
              cy={spacing / 2}
              r={radius}
              fill={color}
              opacity={opacity}
            />
          </pattern>

          {fade && (
            <>
              <radialGradient id={gradientId}>
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="70%" stopColor="white" stopOpacity="0.85" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>

              <mask id={maskId}>
                <rect width="100%" height="100%" fill={`url(#${gradientId})`} />
              </mask>
            </>
          )}
        </defs>

        <rect
          width="100%"
          height="100%"
          fill={`url(#${patternId})`}
          mask={fade ? `url(#${maskId})` : undefined}
        />
      </svg>
    </div>
  );
}
