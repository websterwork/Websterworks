"use client";

/**
 * -----------------------------------------------------------------------------
 * useCounter
 * -----------------------------------------------------------------------------
 *
 * Animates a numeric value from a start value to an end value.
 *
 * Useful for:
 * • Animated Counters
 * • Statistics
 * • Dashboards
 * • Hero Metrics
 * • Progress Numbers
 *
 * -----------------------------------------------------------------------------
 */

import { useEffect, useState } from "react";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface UseCounterOptions
{
    /**
     * Starting value.
     */
    from?: number;

    /**
     * Ending value.
     */
    to: number;

    /**
     * Animation duration in milliseconds.
     */
    duration?: number;

    /**
     * Start immediately.
     */
    autoStart?: boolean;
}

/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */

export function useCounter ( {
    from = 0,
    to,
    duration = 1000,
    autoStart = true,
}: UseCounterOptions ): number
{
    const [ count, setCount ] = useState( from );

    useEffect( () =>
    {
        if ( !autoStart )
        {
            setCount( from );
            return;
        }

        let animationFrame: number;

        const startTime = performance.now();

        const animate = ( currentTime: number ) =>
        {
            const elapsed = currentTime - startTime;

            const progress = Math.min( elapsed / duration, 1 );

            const value = from + ( to - from ) * progress;

            setCount( value );

            if ( progress < 1 )
            {
                animationFrame = requestAnimationFrame( animate );
            }
        };

        animationFrame = requestAnimationFrame( animate );

        return () =>
        {
            cancelAnimationFrame( animationFrame );
        };
    }, [ from, to, duration, autoStart ] );

    return count;
}