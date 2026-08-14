"use client";

/**
 * -----------------------------------------------------------------------------
 * useIsomorphicLayoutEffect
 * -----------------------------------------------------------------------------
 *
 * A safe version of useLayoutEffect for Next.js.
 *
 * Uses:
 * • useLayoutEffect on the client
 * • useEffect during SSR
 *
 * Useful for:
 * • GSAP
 * • Motion
 * • DOM Measurements
 * • Refs
 * • Animations
 *
 * -----------------------------------------------------------------------------
 */

import
    {
        useEffect,
        useLayoutEffect,
    } from "react";

/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */

export const useIsomorphicLayoutEffect =
    typeof window !== "undefined"
        ? useLayoutEffect
        : useEffect;