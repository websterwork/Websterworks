"use client";

/**
 * -----------------------------------------------------------------------------
 * Noise
 * -----------------------------------------------------------------------------
 *
 * SVG noise texture overlay.
 *
 * Features
 * • Configurable opacity
 * • Configurable base frequency
 * • Configurable number of octaves
 * • Configurable scale
 * • Multiple instances supported (useId)
 * • Blend mode support
 * • ClassName support
 *
 * -----------------------------------------------------------------------------
 */

import { useId } from "react";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

export interface NoiseProps {
  className?: string;

  /**
   * Overall opacity.
   */
  opacity?: number;

  /**
   * Noise frequency.
   */
  baseFrequency?: number;

  /**
   * Noise detail.
   */
  numOctaves?: number;

  /**
   * Texture scale.
   */
  scale?: number;

  /**
   * SVG blend mode.
   */
  blendMode?:
    | "normal"
    | "multiply"
    | "screen"
    | "overlay"
    | "soft-light"
    | "hard-light"
    | "color-dodge"
    | "luminosity";
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function Noise({
  className,
  opacity = 0.05,
  baseFrequency = 0.75,
  numOctaves = 4,
  scale = 160,
  blendMode = "soft-light",
}: NoiseProps) {
  const id = useId();

  const filterId = `${id}-noise`;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      style={{
        opacity,
        mixBlendMode: blendMode,
      }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id={filterId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency={baseFrequency}
            numOctaves={numOctaves}
            stitchTiles="stitch"
          />

          <feColorMatrix type="saturate" values="0" />
        </filter>

        <rect
          width="100%"
          height="100%"
          filter={`url(#${filterId})`}
          transform={`scale(${scale / 100})`}
        />
      </svg>
    </div>
  );
}
