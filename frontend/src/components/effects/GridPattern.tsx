"use client";

/**
 * -----------------------------------------------------------------------------
 * Grid Pattern
 * -----------------------------------------------------------------------------
 *
 * Premium SVG grid background.
 *
 * Features
 * • Multiple instances supported (useId)
 * • Configurable spacing
 * • Configurable stroke width
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

export interface GridPatternProps {
  className?: string;

  /**
   * Space between grid lines.
   */
  size?: number;

  /**
   * Grid line thickness.
   */
  strokeWidth?: number;

  /**
   * Grid color.
   */
  color?: string;

  /**
   * Grid opacity.
   */
  opacity?: number;

  /**
   * Enable fade mask.
   */
  fade?: boolean;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function GridPattern({
  className,
  size = 48,
  strokeWidth = 1,
  color = "currentColor",
  opacity = 0.08,
  fade = true,
}: GridPatternProps) {
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
            width={size}
            height={size}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${size} 0 L 0 0 0 ${size}`}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
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
