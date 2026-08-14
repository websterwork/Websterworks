"use client";

/**
 * -----------------------------------------------------------------------------
 * useDebounce
 * -----------------------------------------------------------------------------
 *
 * Delays updating a value until after a specified delay.
 *
 * Useful for:
 * • Search Inputs
 * • API Requests
 * • Form Validation
 * • Auto Save
 * • Filtering
 *
 * -----------------------------------------------------------------------------
 */

import { useEffect, useState } from "react";

/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */

export function useDebounce<T> (
    value: T,
    delay = 500,
): T
{
    const [ debouncedValue, setDebouncedValue ] =
        useState<T>( value );

    useEffect( () =>
    {
        const timeout = window.setTimeout( () =>
        {
            setDebouncedValue( value );
        }, delay );

        return () =>
        {
            window.clearTimeout( timeout );
        };
    }, [ value, delay ] );

    return debouncedValue;
}