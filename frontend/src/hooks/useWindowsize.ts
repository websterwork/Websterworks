"use client";

/**
 * -----------------------------------------------------------------------------
 * useWindowSize
 * -----------------------------------------------------------------------------
 *
 * Tracks the current browser window size.
 *
 * Useful for:
 * • Responsive Layouts
 * • Three.js Canvas
 * • Animations
 * • Charts
 * • Fullscreen Components
 *
 * -----------------------------------------------------------------------------
 */

import { useState } from "react";

import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface WindowSize
{
    width: number;
    height: number;
}

/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */

export function useWindowSize (): WindowSize
{
    const [ windowSize, setWindowSize ] = useState<WindowSize>( {
        width: 0,
        height: 0,
    } );

    useIsomorphicLayoutEffect( () =>
    {
        const handleResize = () =>
        {
            setWindowSize( {
                width: window.innerWidth,
                height: window.innerHeight,
            } );
        };

        handleResize();

        window.addEventListener( "resize", handleResize );

        return () =>
        {
            window.removeEventListener( "resize", handleResize );
        };
    }, [] );

    return windowSize;
}