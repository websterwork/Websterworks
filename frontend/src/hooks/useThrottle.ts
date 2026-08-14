"use client";

/**
 * -----------------------------------------------------------------------------
 * useThrottle
 * -----------------------------------------------------------------------------
 *
 * Throttles a value, updating it at most once during the
 * specified delay interval.
 *
 * Useful for:
 * • Scroll Events
 * • Mouse Movement
 * • Resize Events
 * • Drag & Drop
 * • Canvas
 * • Three.js
 *
 * -----------------------------------------------------------------------------
 */

import { useEffect, useRef, useState } from "react";

/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */

export function useThrottle<T> (
    value: T,
    delay = 200,
): T
{
    const [ throttledValue, setThrottledValue ] =
        useState( value );

    const lastExecuted = useRef( 0 );

    useEffect( () =>
    {
        const now = Date.now();
        const remaining = delay - ( now - lastExecuted.current );

        if ( remaining <= 0 )
        {
            lastExecuted.current = now;
            setThrottledValue( value );
            return;
        }

        const timeout = window.setTimeout( () =>
        {
            lastExecuted.current = Date.now();
            setThrottledValue( value );
        }, remaining );

        return () =>
        {
            window.clearTimeout( timeout );
        };
    }, [ value, delay ] );

    return throttledValue;
}