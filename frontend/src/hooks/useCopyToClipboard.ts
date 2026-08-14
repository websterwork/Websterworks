"use client";

/**
 * -----------------------------------------------------------------------------
 * useCopyToClipboard
 * -----------------------------------------------------------------------------
 *
 * Copies text to the user's clipboard.
 *
 * Useful for:
 * • Copy Buttons
 * • Invite Links
 * • API Keys
 * • Emails
 * • URLs
 *
 * -----------------------------------------------------------------------------
 */

import { useCallback, useState } from "react";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface UseCopyToClipboardOptions
{
    /**
     * Reset copied state after X milliseconds.
     */
    timeout?: number;
}

/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */

export function useCopyToClipboard (
    options: UseCopyToClipboardOptions = {},
)
{
    const { timeout = 2000 } = options;

    const [ copied, setCopied ] = useState( false );

    const copy = useCallback(
        async ( text: string ): Promise<boolean> =>
        {
            if ( typeof navigator === "undefined" || !navigator.clipboard )
            {
                return false;
            }

            try
            {
                await navigator.clipboard.writeText( text );

                setCopied( true );

                window.setTimeout( () =>
                {
                    setCopied( false );
                }, timeout );

                return true;
            } catch ( error )
            {
                console.error( "Failed to copy:", error );

                return false;
            }
        },
        [ timeout ],
    );

    return {
        copied,
        copy,
    };
}