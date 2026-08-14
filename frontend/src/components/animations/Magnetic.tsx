"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from "motion/react";
import { useRef } from "react";

import { cn } from "@/lib/utils";

interface MagneticProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;

  className?: string;

  /**
   * Maximum movement in pixels.
   */
  strength?: number;

  /**
   * Disable effect.
   */
  disabled?: boolean;
}

export function Magnetic({
  children,
  className,
  strength = 30,
  disabled = false,
  onMouseMove,
  onMouseLeave,
  ...props
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 220,
    damping: 20,
    mass: 0.4,
  });

  const springY = useSpring(y, {
    stiffness: 220,
    damping: 20,
    mass: 0.4,
  });

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (disabled || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);

    x.set((offsetX / (rect.width / 2)) * strength);
    y.set((offsetY / (rect.height / 2)) * strength);

    onMouseMove?.(event);
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = (event) => {
    x.set(0);
    y.set(0);

    onMouseLeave?.(event);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        x: springX,
        y: springY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("inline-flex", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
