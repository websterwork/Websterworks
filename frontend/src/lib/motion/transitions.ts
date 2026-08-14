/**
 * Shared Framer Motion transition & spring physics presets.
 */

import { Transition } from "motion/react";
import { easings, cubicBezier } from "./easings";

export const duration = {
    instant: 0.1,
    fast: 0.2,
    normal: 0.35,
    slow: 0.6,
    slower: 0.8,
    hero: 1.2,
} as const;

/* Basic Timed Transitions */
export const fadeTransition: Transition = {
    duration: duration.normal,
    ease: easings.easeOut,
};

export const smoothTransition: Transition = {
    duration: duration.slow,
    ease: cubicBezier.premium,
};

export const fastTransition: Transition = {
    duration: duration.fast,
    ease: easings.easeOut,
};

export const pageTransition: Transition = {
    duration: duration.slow,
    ease: cubicBezier.gentle,
};

export const heroTransition: Transition = {
    duration: duration.hero,
    ease: cubicBezier.premium,
};

export const hoverTransition: Transition = {
    duration: duration.fast,
    ease: cubicBezier.snappy,
};

/* Spring Physics Presets */
export const springTransition: Transition = {
    type: "spring",
    stiffness: 180,
    damping: 22,
    mass: 0.8,
};

export const softSpringTransition: Transition = {
    type: "spring",
    stiffness: 120,
    damping: 18,
    mass: 1,
};

export const snappySpringTransition: Transition = {
    type: "spring",
    stiffness: 260,
    damping: 20,
    mass: 0.7,
};

export const bouncySpringTransition: Transition = {
    type: "spring",
    stiffness: 300,
    damping: 12,
    mass: 0.8,
};

export const dropBounceTransition: Transition = {
    type: "spring",
    bounce: 0.4,
    duration: duration.hero,
};