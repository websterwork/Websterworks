"use client";

/**
 * -----------------------------------------------------------------------------
 * Technology Particle
 * -----------------------------------------------------------------------------
 *
 * Individual floating technology.
 *
 * Responsibilities
 * • Render icon
 * • Render label
 * • Hover animation
 * • GPU accelerated transforms
 *
 * -----------------------------------------------------------------------------
 */

import { motion, type MotionValue } from "motion/react";

import { Icon, type IconName } from "@/components/icons";

export interface TechnologyParticleProps {
  name: string;

  icon: IconName;

  x: MotionValue<number>;

  y: MotionValue<number>;

  rotation: MotionValue<number>;

  scale: MotionValue<number>;
}

export function TechnologyParticle({
  name,
  icon,
  x,
  y,
  rotation,
  scale,
}: TechnologyParticleProps) {
  return (
    <motion.div
      style={{
        x,
        y,
        rotate: rotation,
        scale,
      }}
      whileHover={{
        scale: 1.15,
        y: -6,
      }}
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 20,
      }}
      className="
        absolute
        flex
        flex-col
        items-center
        justify-center
        gap-3
        select-none
        cursor-pointer
        will-change-transform
        group
      "
    >
      {/* Glow */}

      <div
        className="
          absolute
          inset-0
          -z-10
          rounded-full
          bg-primary/20
          blur-3xl
          opacity-0
          transition-all
          duration-300
          group-hover:scale-150
          group-hover:opacity-100
        "
      />

      {/* Icon */}

      <motion.div
        whileHover={{
          rotate: 8,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
        }}
      >
        <Icon
          name={icon}
          size={44}
          className="
            text-foreground
            transition-all
            duration-300
            group-hover:text-primary
            group-hover:drop-shadow-[0_0_20px_rgba(152,16,250,0.8)]
          "
        />
      </motion.div>

      {/* Label */}

      <span
        className="
          whitespace-nowrap
          text-xs
          font-medium
          tracking-wide
          text-muted-foreground
          transition-all
          duration-300
          group-hover:text-foreground
        "
      >
        {name}
      </span>
    </motion.div>
  );
}
