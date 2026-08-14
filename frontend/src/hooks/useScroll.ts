"use client";

/**
 * -----------------------------------------------------------------------------
 * useScroll
 * -----------------------------------------------------------------------------
 *
 * Tracks the current window scroll position.
 *
 * Useful for:
 * • Sticky Navigation
 * • Scroll Animations
 * • Progress Indicators
 * • Infinite Scroll
 * • Parallax
 * • Back To Top Buttons
 *
 * -----------------------------------------------------------------------------
 */

import { useState } from "react";

import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface ScrollState
{
    x: number;
    y: number;

    /**
     * Scroll direction.
     */
    direction: "up" | "down";

    /**
     * Whether the page is scrolling.
     */
    isScrolling: boolean;
}

/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */

export function useScroll (): ScrollState
{
    const [ scroll, setScroll ] = useState<ScrollState>( {
        x: 0,
        y: 0,
        direction: "down",
        isScrolling: false,
    } );

    useIsomorphicLayoutEffect( () =>
    {
        let timeout: NodeJS.Timeout;

        const handleScroll = () =>
        {
            setScroll( ( previous ) => ( {
                x: window.scrollX,
                y: window.scrollY,
                direction:
                    window.scrollY > previous.y
                        ? "down"
                        : "up",
                isScrolling: true,
            } ) );

            clearTimeout( timeout );

            timeout = setTimeout( () =>
            {
                setScroll( ( previous ) => ( {
                    ...previous,
                    isScrolling: false,
                } ) );
            }, 150 );
        };

        handleScroll();

        window.addEventListener( "scroll", handleScroll, {
            passive: true,
        } );

        return () =>
        {
            clearTimeout( timeout );

            window.removeEventListener(
                "scroll",
                handleScroll,
            );
        };
    }, [] );

    return scroll;
}