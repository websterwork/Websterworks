"use client";

/**
 * -----------------------------------------------------------------------------
 * Pointer Effect
 * -----------------------------------------------------------------------------
 * Replaces the native cursor on fine-pointer devices with a violet
 * core, lagging ring, and a soft accent bloom.
 *
 * Disabled when:
 * • The device has no hover / fine pointer (touch)
 * • The user prefers reduced motion
 * -----------------------------------------------------------------------------
 */

import { useEffect, useState } from "react";

import { motion, useMotionValue, useSpring } from "motion/react";

import { useMediaQuery } from "@/hooks";

const INTERACTIVE =
  "a, button, [role='button'], [role='link'], [role='menuitem'], summary, label, select, .cursor-pointer, [data-cursor='hover']";

const TEXT =
  "input:not([type='button']):not([type='submit']):not([type='reset']):not([type='checkbox']):not([type='radio']):not([type='range']):not([type='color']):not([type='file']), textarea, [contenteditable='true']";

type PointerMode = "default" | "hover" | "text";

export function PointerEffect() {
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  if (!canHover || reducedMotion) {
    return null;
  }

  return <CustomPointer />;
}

function CustomPointer() {
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [mode, setMode] = useState<PointerMode>("default");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const coreX = useSpring(mouseX, { stiffness: 520, damping: 32, mass: 0.28 });
  const coreY = useSpring(mouseY, { stiffness: 520, damping: 32, mass: 0.28 });
  const ringX = useSpring(mouseX, { stiffness: 170, damping: 20, mass: 0.55 });
  const ringY = useSpring(mouseY, { stiffness: 170, damping: 20, mass: 0.55 });

  useEffect(() => {
    document.documentElement.classList.add("custom-pointer");

    return () => {
      document.documentElement.classList.remove("custom-pointer");
    };
  }, []);

  useEffect(() => {
    const resolveMode = (target: EventTarget | null): PointerMode => {
      if (!(target instanceof Element)) {
        return "default";
      }

      if (target.closest(TEXT)) {
        return "text";
      }

      if (target.closest(INTERACTIVE)) {
        return "hover";
      }

      return "default";
    };

    const onMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setVisible(true);
      setMode(resolveMode(event.target));
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [mouseX, mouseY]);

  const hovering = mode === "hover";
  const typing = mode === "text";

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-9999 hidden md:block"
    >
      <motion.div
        className="absolute left-0 top-0 rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible ? (typing ? 0 : 1) : 0,
          width: hovering ? 52 : 36,
          height: hovering ? 52 : 36,
          scale: pressed ? 0.86 : 1,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
      >
        <span
          className="block size-full rounded-full"
          style={{
            border: "1.5px solid var(--primary)",
            boxShadow: hovering
              ? "0 0 22px color-mix(in srgb, var(--accent) 55%, transparent), inset 0 0 12px color-mix(in srgb, var(--primary) 28%, transparent)"
              : "0 0 14px color-mix(in srgb, var(--primary) 40%, transparent)",
            background: hovering
              ? "color-mix(in srgb, var(--primary) 10%, transparent)"
              : "transparent",
          }}
        />
      </motion.div>

      <motion.div
        className="absolute left-0 top-0"
        style={{
          x: coreX,
          y: coreY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: typing ? 1 : pressed ? 0.72 : hovering ? 0.45 : 1,
          borderRadius: typing ? 2 : 999,
          width: typing ? 2 : 8,
          height: typing ? 18 : 8,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 24 }}
      >
        <span
          className="block size-full"
          style={{
            borderRadius: "inherit",
            background: typing
              ? "var(--primary)"
              : "radial-gradient(circle at 30% 30%, var(--accent), var(--primary) 70%)",
            boxShadow:
              "0 0 12px color-mix(in srgb, var(--accent) 70%, transparent), 0 0 2px var(--primary)",
          }}
        />
      </motion.div>
    </div>
  );
}
