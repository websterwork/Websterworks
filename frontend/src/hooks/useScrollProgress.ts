"use client";

/**
 * -----------------------------------------------------------------------------
 * useScrollProgress
 * -----------------------------------------------------------------------------
 *
 * Tracks the user's scroll progress through the page.
 *
 * Useful for:
 * • Reading Progress Bars
 * • Scroll Indicators
 * • Page Progress
 * • Scroll Animations
 * • Hero Effects
 *
 * -----------------------------------------------------------------------------
 */

import { useState } from "react";

import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface ScrollProgressState
{
    /**
     * Progress between 0 and 1.
     */
    progress: number;

    /**
     * Progress between 0 and 100.
     */
    percentage: number;
}

/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */

export function useScrollProgress (): ScrollProgressState
{
    const [ state, setState ] = useState<ScrollProgressState>( {
        progress: 0,
        percentage: 0,
    } );

    useIsomorphicLayoutEffect( () =>
    {
        const handleScroll = () =>
        {
            const scrollTop = window.scrollY;

            const scrollHeight =
                document.documentElement.scrollHeight -
                window.innerHeight;

            const progress =
                scrollHeight <= 0
                    ? 0
                    : scrollTop / scrollHeight;

            setState( {
                progress,
                percentage: progress * 100,
            } );
        };

        handleScroll();

        window.addEventListener( "scroll", handleScroll, {
            passive: true,
        } );

        window.addEventListener( "resize", handleScroll );

        return () =>
        {
            window.removeEventListener(
                "scroll",
                handleScroll,
            );

            window.removeEventListener(
                "resize",
                handleScroll,
            );
        };
    }, [] );

    return state;
}