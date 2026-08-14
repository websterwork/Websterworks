"use client";

/**
 * -----------------------------------------------------------------------------
 * useParallax
 * -----------------------------------------------------------------------------
 *
 * Calculates a parallax offset based on the page scroll.
 *
 * Useful for:
 * • Hero Backgrounds
 * • Floating Images
 * • Scroll Animations
 * • Decorative Elements
 * • Three.js Objects
 *
 * -----------------------------------------------------------------------------
 */

import { useMemo } from "react";

import { useScroll } from "./useScroll";

/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */

export function useParallax ( speed = 0.5 ): number
{
    const { y } = useScroll();

    const offset = useMemo( () =>
    {
        return y * speed;
    }, [ speed, y ] );

    return offset;
}