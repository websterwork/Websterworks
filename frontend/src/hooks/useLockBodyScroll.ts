"use client";

/**
 * -----------------------------------------------------------------------------
 * useLockBodyScroll
 * -----------------------------------------------------------------------------
 *
 * Locks the document body scroll while enabled.
 *
 * Useful for:
 * • Dialogs
 * • Sheets
 * • Drawers
 * • Mobile Navigation
 * • Fullscreen Menus
 * • Image Viewers
 *
 * -----------------------------------------------------------------------------
 */

import { useEffect } from "react";

/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */

export function useLockBodyScroll ( enabled = true ): void
{
    useEffect( () =>
    {
        if ( !enabled ) return;

        const { body } = document;

        const originalOverflow = body.style.overflow;
        const originalPaddingRight = body.style.paddingRight;

        // Prevent layout shift when scrollbar disappears
        const scrollbarWidth =
            window.innerWidth - document.documentElement.clientWidth;

        body.style.overflow = "hidden";

        if ( scrollbarWidth > 0 )
        {
            body.style.paddingRight = `${ scrollbarWidth }px`;
        }

        return () =>
        {
            body.style.overflow = originalOverflow;
            body.style.paddingRight = originalPaddingRight;
        };
    }, [ enabled ] );
}