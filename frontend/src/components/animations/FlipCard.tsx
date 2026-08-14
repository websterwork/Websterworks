"use client";

/**
 * -----------------------------------------------------------------------------
 * Flip Card
 * -----------------------------------------------------------------------------
 *
 * 3D card flip animation.
 *
 * Features
 * • Hover flip
 * • Click flip (optional)
 * • Horizontal / Vertical flip
 * • Configurable perspective
 * • Configurable duration
 * • Controlled / uncontrolled mode
 * • Front & Back slots
 *
 * -----------------------------------------------------------------------------
 */

import { useState } from "react";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

interface FlipCardProps {
  front: React.ReactNode;

  back: React.ReactNode;

  className?: string;

  /**
   * Card height.
   */
  height?: string;

  /**
   * Card width.
   */
  width?: string;

  /**
   * Perspective.
   */
  perspective?: number;

  /**
   * Flip direction.
   */
  direction?: "horizontal" | "vertical";

  /**
   * Hover or click.
   */
  trigger?: "hover" | "click";

  /**
   * Animation duration.
   */
  duration?: number;

  /**
   * Controlled state.
   */
  flipped?: boolean;

  /**
   * Disable interaction.
   */
  disabled?: boolean;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function FlipCard({
  front,
  back,
  className,
  height = "320px",
  width = "100%",
  perspective = 1200,
  direction = "horizontal",
  trigger = "hover",
  duration = 0.7,
  flipped,
  disabled = false,
}: FlipCardProps) {
  const [internalFlip, setInternalFlip] = useState(false);

  const isFlipped = flipped ?? internalFlip;

  function toggleFlip() {
    if (disabled) return;

    if (trigger === "click" && flipped === undefined) {
      setInternalFlip((value) => !value);
    }
  }

  const hoverAnimation =
    trigger === "hover" && !disabled
      ? {
          rotateY: direction === "horizontal" ? 180 : 0,
          rotateX: direction === "vertical" ? 180 : 0,
        }
      : undefined;

  const controlledAnimation = {
    rotateY: direction === "horizontal" ? (isFlipped ? 180 : 0) : 0,

    rotateX: direction === "vertical" ? (isFlipped ? 180 : 0) : 0,
  };

  return (
    <div
      className={cn("relative", className)}
      style={{
        perspective,
        width,
        height,
      }}
      onClick={toggleFlip}
    >
      <motion.div
        className="relative h-full w-full"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={controlledAnimation}
        whileHover={hoverAnimation}
        transition={{
          duration,
        }}
      >
        {/* ---------------------------------------------------------------- */}
        {/* Front                                                            */}
        {/* ---------------------------------------------------------------- */}

        <div
          className="absolute inset-0 h-full w-full"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {front}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Back                                                             */}
        {/* ---------------------------------------------------------------- */}

        <div
          className="absolute inset-0 h-full w-full"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform:
              direction === "horizontal"
                ? "rotateY(180deg)"
                : "rotateX(180deg)",
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
}
