"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type HTMLMotionProps } from "motion/react";

import { cn } from "@/lib/utils";
import { fade } from "@/lib/motion";

interface TextScrambleProps extends HTMLMotionProps<"span"> {
  text: string;
  className?: string;

  /**
   * Delay before scrambling starts (ms)
   */
  delay?: number;

  /**
   * Interval between updates (ms)
   */
  speed?: number;

  /**
   * Characters used while scrambling.
   */
  characters?: string;

  /**
   * Automatically start animation.
   */
  autoStart?: boolean;
}

const DEFAULT_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*";

export function TextScramble({
  text,
  className,
  delay = 0,
  speed = 30,
  characters = DEFAULT_CHARACTERS,
  autoStart = true,
  ...props
}: TextScrambleProps) {
  const [display, setDisplay] = useState(text);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!autoStart) return;

    const timeout = setTimeout(() => {
      let iteration = 0;

      intervalRef.current = setInterval(() => {
        setDisplay(() =>
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) return char;

              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join(""),
        );

        iteration += 1 / 3;

        if (iteration >= text.length) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }

          setDisplay(text);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, delay, speed, characters, autoStart]);

  return (
    <motion.span
      variants={fade}
      initial="hidden"
      animate="visible"
      className={cn("inline-block whitespace-pre-wrap", className)}
      {...props}
    >
      {display}
    </motion.span>
  );
}
