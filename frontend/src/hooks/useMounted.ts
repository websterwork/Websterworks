"use client";

/**
 * -----------------------------------------------------------------------------
 * useMounted
 * -----------------------------------------------------------------------------
 *
 * Returns true once the component has mounted on the client.
 *
 * Useful for:
 * • Preventing hydration mismatches
 * • Browser-only APIs
 * • Theme switching
 * • Local Storage
 * • Window APIs
 * • Media Queries
 *
 * -----------------------------------------------------------------------------
 */

import { useEffect, useState } from "react";

/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */

export function useMounted (): boolean
{
    const [ mounted, setMounted ] = useState( false );

    useEffect( () =>
    {
        setMounted( true );

        return () =>
        {
            setMounted( false );
        };
    }, [] );

    return mounted;
}