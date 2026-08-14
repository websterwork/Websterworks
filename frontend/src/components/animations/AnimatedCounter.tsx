"use client";

/**
 * -----------------------------------------------------------------------------
 * Animated Counter
 * -----------------------------------------------------------------------------
 *
 * Animates numbers when they enter the viewport.
 *
 * Features
 * • Count up animation
 * • Prefix / Suffix
 * • Decimal support
 * • Thousand separators
 * • Viewport aware
 * • Custom duration
 * • Custom delay
 *
 * -----------------------------------------------------------------------------
 */

import { useEffect, useRef } from "react";

import { animate, useInView, useMotionValue } from "motion/react";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

interface AnimatedCounterProps {
  from?: number;

  to: number;

  duration?: number;

  delay?: number;

  decimals?: number;

  separator?: boolean;

  prefix?: string;

  suffix?: string;

  className?: string;

  once?: boolean;

  amount?: number;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function AnimatedCounter({
  from = 0,

  to,

  duration = 1.5,

  delay = 0,

  decimals = 0,

  separator = true,

  prefix = "",

  suffix = "",

  className,

  once = true,

  amount = 0.2,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const value = useMotionValue(from);

  const isInView = useInView(ref, {
    once,
    amount,
  });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(value, to, {
      duration,
      delay,

      onUpdate(latest) {
        if (!ref.current) return;

        const formatted = separator
          ? latest.toLocaleString(undefined, {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            })
          : latest.toFixed(decimals);

        ref.current.textContent = `${prefix}${formatted}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [
    isInView,
    value,
    to,
    duration,
    delay,
    decimals,
    separator,
    prefix,
    suffix,
  ]);

  return (
    <span ref={ref} className={cn(className)}>
      {`${prefix}${from.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`}
    </span>
  );
}
