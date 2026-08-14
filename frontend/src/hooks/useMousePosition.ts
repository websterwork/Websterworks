"use client";

/**
 * -----------------------------------------------------------------------------
 * useMousePosition
 * -----------------------------------------------------------------------------
 *
 * Tracks the current mouse position.
 *
 * Useful for:
 * • Cursor Effects
 * • Spotlight
 * • Magnetic Elements
 * • Tilt Cards
 * • Hero Animations
 * • Three.js Interactions
 *
 * -----------------------------------------------------------------------------
 */

import { useState } from "react";

import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface MousePosition
{
    /**
     * Mouse X position.
     */
    x: number;

    /**
     * Mouse Y position.
     */
    y: number;
}

/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */

export function useMousePosition (): MousePosition
{
    const [ position, setPosition ] = useState<MousePosition>( {
        x: 0,
        y: 0,
    } );

    useIsomorphicLayoutEffect( () =>
    {
        const handleMouseMove = ( event: MouseEvent ) =>
        {
            setPosition( {
                x: event.clientX,
                y: event.clientY,
            } );
        };

        window.addEventListener(
            "mousemove",
            handleMouseMove,
            {
                passive: true,
            },
        );

        return () =>
        {
            window.removeEventListener(
                "mousemove",
                handleMouseMove,
            );
        };
    }, [] );

    return position;
}