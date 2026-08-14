"use client";

/**
 * -----------------------------------------------------------------------------
 * Typewriter
 * -----------------------------------------------------------------------------
 *
 * Reusable typewriter animation.
 *
 * Features
 * • Single text
 * • Multiple rotating words
 * • Typing animation
 * • Deleting animation
 * • Loop support
 * • Custom cursor
 * • Semantic HTML
 *
 * -----------------------------------------------------------------------------
 */

import React, { ElementType, useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

export interface TypewriterProps<T extends ElementType = "div"> {
  as?: T;

  text?: string;

  words?: string[];

  className?: string;

  typingSpeed?: number;

  deletingSpeed?: number;

  pauseDuration?: number;

  loop?: boolean;

  cursor?: boolean;

  cursorCharacter?: string;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function Typewriter<T extends ElementType = "div">({
  as,

  text,

  words,

  className,

  typingSpeed = 70,

  deletingSpeed = 40,

  pauseDuration = 1500,

  loop = true,

  cursor = true,

  cursorCharacter = "|",
}: TypewriterProps<T>) {
  // Cast to a React component type that accepts children and HTML attributes
  const Component = (as ?? "div") as unknown as React.ComponentType<
    React.HTMLAttributes<HTMLElement>
  >;

  const values = words && words.length > 0 ? words : text ? [text] : [];

  const [wordIndex, setWordIndex] = useState(0);

  const [displayText, setDisplayText] = useState("");

  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (values.length === 0) return;

    const currentWord = values[wordIndex];

    let timeout: NodeJS.Timeout;

    if (!deleting) {
      if (displayText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        if (!loop && values.length === 1) return;

        timeout = setTimeout(() => {
          setDeleting(true);
        }, pauseDuration);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        setDeleting(false);

        setWordIndex((previous) => (previous + 1) % values.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    displayText,
    deleting,
    wordIndex,
    values,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    loop,
  ]);

  return (
    <Component className={cn("inline-flex items-center", className)}>
      <span>{displayText}</span>

      {cursor && (
        <motion.span
          className="ml-1 inline-block"
          animate={{
            opacity: [1, 0],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {cursorCharacter}
        </motion.span>
      )}
    </Component>
  );
}
