"use client";

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
        scale: 1.12,
      }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 24,
        mass: 0.8,
      }}
      className="
        group
        absolute
        left-0
        top-0
        flex
        cursor-pointer
        select-none
        flex-col
        items-center
        justify-center
        gap-2
        will-change-transform
      "
    >
      {/* Visual Container for CSS offset to prevent MotionValue transform conflicts */}
      <div className="flex flex-col items-center justify-center gap-2 transition-transform duration-300 ease-out group-hover:-translate-y-2">
        {/* Glow backdrop */}
        <div
          className="
            absolute
            inset-0
            -z-10
            rounded-full
            bg-primary/25
            blur-2xl
            opacity-0
            transition-all
            duration-500
            ease-out
            group-hover:scale-150
            group-hover:opacity-100
          "
        />

        {/* Icon with smooth rotation */}
        <motion.div
          whileHover={{ rotate: 6 }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 20,
          }}
        >
          <Icon
            name={icon}
            size={36}
            className="
              text-foreground/80
              transition-colors
              duration-300
              sm:h-10 sm:w-10
              md:h-11 md:w-11
              group-hover:text-primary
            "
          />
        </motion.div>

        {/* Label */}
        <span
          className="
            whitespace-nowrap
            text-[11px]
            font-medium
            tracking-wide
            text-muted-foreground
            transition-colors
            duration-300
            sm:text-xs
            group-hover:text-foreground
          "
        >
          {name}
        </span>
      </div>
    </motion.div>
  );
}
