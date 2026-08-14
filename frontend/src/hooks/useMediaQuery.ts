"use client";

/**
 * -----------------------------------------------------------------------------
 * useMediaQuery
 * -----------------------------------------------------------------------------
 *
 * React hook for subscribing to CSS media queries.
 *
 * Useful for:
 * • Responsive Layouts
 * • Mobile Detection
 * • Desktop Detection
 * • Theme Preferences
 * • Reduced Motion
 *
 * -----------------------------------------------------------------------------
 */

import { useState } from "react";

import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */

export function useMediaQuery ( query: string ): boolean
{
    const getMatches = () =>
    {
        if ( typeof window === "undefined" )
        {
            return false;
        }

        return window.matchMedia( query ).matches;
    };

    const [ matches, setMatches ] = useState( getMatches );

    useIsomorphicLayoutEffect( () =>
    {
        const mediaQuery = window.matchMedia( query );

        const handleChange = () =>
        {
            setMatches( mediaQuery.matches );
        };

        handleChange();

        mediaQuery.addEventListener( "change", handleChange );

        return () =>
        {
            mediaQuery.removeEventListener( "change", handleChange );
        };
    }, [ query ] );

    return matches;
}