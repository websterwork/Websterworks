"use client";

/**
 * -----------------------------------------------------------------------------
 * Particle Field
 * -----------------------------------------------------------------------------
 *
 * Animated floating particle background.
 *
 * Features
 * • Configurable particle count
 * • Configurable size
 * • Configurable color
 * • Configurable opacity
 * • Configurable duration
 * • Configurable animation
 * • ClassName support
 *
 * -----------------------------------------------------------------------------
 */

import { motion } from "motion/react";

import { cubicBezier } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

export interface ParticleFieldProps {
  className?: string;

  /**
   * Number of particles.
   */
  count?: number;

  /**
   * Particle size.
   */
  size?: number;

  /**
   * Particle color.
   */
  color?: string;

  /**
   * Particle opacity.
   */
  opacity?: number;

  /**
   * Enable animation.
   */
  animated?: boolean;

  /**
   * Animation duration.
   */
  duration?: number;
}

/* -------------------------------------------------------------------------- */
/* Generate Stable Particles                                                  */
/* -------------------------------------------------------------------------- */

function createParticles(
  count: number,
  size: number,
  opacity: number,
  color: string,
) {
  return Array.from({ length: count }, (_, index) => ({
    id: index,

    left: Math.random() * 100,

    top: Math.random() * 100,

    delay: Math.random() * 6,

    duration: 8 + Math.random() * 8,

    scale: 0.6 + Math.random() * 0.8,

    size: size * (0.5 + Math.random()),

    opacity: opacity * (0.4 + Math.random() * 0.6),

    color,
  }));
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function ParticleField({
  className,
  count = 40,
  size = 4,
  color = "bg-primary",
  opacity = 0.35,
  animated = true,
  duration = 12,
}: ParticleFieldProps) {
  const particles = createParticles(count, size, opacity, color);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={cn("absolute rounded-full", particle.color)}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            opacity: particle.opacity,
          }}
          animate={
            animated
              ? {
                  y: [0, -40, 0],
                  x: [0, 12, -8, 0],
                  scale: [particle.scale, particle.scale * 1.2, particle.scale],
                }
              : undefined
          }
          transition={{
            repeat: Infinity,
            duration: particle.duration + duration * 0.1,
            delay: particle.delay,
            ease: cubicBezier.gentle,
          }}
        />
      ))}
    </div>
  );
}
