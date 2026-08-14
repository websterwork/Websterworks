"use client";

/**
 * -----------------------------------------------------------------------------
 * useClickOutside
 * -----------------------------------------------------------------------------
 *
 * Calls a callback when the user clicks or taps outside
 * the referenced element.
 *
 * Useful for:
 * • Dropdowns
 * • Dialogs
 * • Drawers
 * • Tooltips
 * • Context Menus
 * • Mobile Navigation
 *
 * -----------------------------------------------------------------------------
 */

import { RefObject, useEffect } from "react";

/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */

export function useClickOutside<T extends HTMLElement> (
    ref: RefObject<T | null>,
    callback: () => void,
    enabled = true,
)
{
    useEffect( () =>
    {
        if ( !enabled ) return;

        const handleEvent = ( event: MouseEvent | TouchEvent ) =>
        {
            const element = ref.current;

            if ( !element ) return;

            if ( element.contains( event.target as Node ) )
            {
                return;
            }

            callback();
        };

        document.addEventListener( "mousedown", handleEvent );
        document.addEventListener( "touchstart", handleEvent );

        return () =>
        {
            document.removeEventListener( "mousedown", handleEvent );
            document.removeEventListener( "touchstart", handleEvent );
        };
    }, [ callback, enabled, ref ] );
}