"use client";

/**
 * -----------------------------------------------------------------------------
 * useLocalStorage
 * -----------------------------------------------------------------------------
 *
 * Persists state in localStorage.
 *
 * Useful for:
 * • Theme
 * • User Preferences
 * • Authentication
 * • Shopping Cart
 * • UI State
 * • Saved Forms
 *
 * -----------------------------------------------------------------------------
 */

import { Dispatch, SetStateAction, useEffect, useState } from "react";

/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */

export function useLocalStorage<T> (
    key: string,
    initialValue: T,
): [ T, Dispatch<SetStateAction<T>> ]
{
    const readValue = (): T =>
    {
        if ( typeof window === "undefined" )
        {
            return initialValue;
        }

        try
        {
            const item = window.localStorage.getItem( key );

            return item ? ( JSON.parse( item ) as T ) : initialValue;
        } catch ( error )
        {
            console.warn( `Error reading localStorage key "${ key }":`, error );

            return initialValue;
        }
    };

    const [ storedValue, setStoredValue ] = useState<T>( readValue );

    useEffect( () =>
    {
        try
        {
            window.localStorage.setItem(
                key,
                JSON.stringify( storedValue ),
            );
        } catch ( error )
        {
            console.warn( `Error writing localStorage key "${ key }":`, error );
        }
    }, [ key, storedValue ] );

    return [ storedValue, setStoredValue ];
}