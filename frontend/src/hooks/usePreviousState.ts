"use client";

/**
 * -----------------------------------------------------------------------------
 * usePrevious
 * -----------------------------------------------------------------------------
 *
 * Stores and returns the previous value.
 *
 * Useful for:
 * • Comparing state changes
 * • Animations
 * • Form Validation
 * • Previous Props
 * • Previous State
 *
 * -----------------------------------------------------------------------------
 */

import { useEffect, useRef } from "react";

/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */

export function usePrevious<T> ( value: T ): T | undefined
{
    const ref = useRef<T>( undefined );

    useEffect( () =>
    {
        ref.current = value;
    }, [ value ] );

    return ref.current;
}