"use client";

/**
 * -----------------------------------------------------------------------------
 * Auto Animate
 * -----------------------------------------------------------------------------
 *
 * Automatic layout animations.
 *
 * Features
 * • Add / Remove animation
 * • Reorder animation
 * • Zero configuration
 * • Wrapper component
 * • Optional enable / disable
 *
 * -----------------------------------------------------------------------------
 */

import { useAutoAnimate } from "@formkit/auto-animate/react";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

interface AutoAnimateProps {
  children: React.ReactNode;

  className?: string;

  /**
   * Enable animations.
   */
  enabled?: boolean;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function AutoAnimate({
  children,
  className,
  enabled = true,
}: AutoAnimateProps) {
  const [parent] = useAutoAnimate({
    duration: 250,
    easing: "ease-in-out",
  });

  return (
    <div ref={enabled ? parent : undefined} className={cn(className)}>
      {children}
    </div>
  );
}
