"use client";

/**
 * -----------------------------------------------------------------------------
 * useTypewriter
 * -----------------------------------------------------------------------------
 *
 * Types and optionally deletes text in a typewriter animation.
 *
 * Useful for:
 * • Hero Titles
 * • Landing Pages
 * • Marketing Text
 * • Loading Messages
 * • Terminal Effects
 *
 * -----------------------------------------------------------------------------
 */

import { useEffect, useState } from "react";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface UseTypewriterOptions
{
    /**
     * Words to animate.
     */
    words: string[];

    /**
     * Typing speed (ms).
     */
    typeSpeed?: number;

    /**
     * Delete speed (ms).
     */
    deleteSpeed?: number;

    /**
     * Delay before deleting (ms).
     */
    delay?: number;

    /**
     * Loop animation.
     */
    loop?: boolean;
}

/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */

export function useTypewriter ( {
    words,
    typeSpeed = 100,
    deleteSpeed = 50,
    delay = 1500,
    loop = true,
}: UseTypewriterOptions )
{
    const [ text, setText ] = useState( "" );
    const [ wordIndex, setWordIndex ] = useState( 0 );
    const [ isDeleting, setIsDeleting ] = useState( false );

    useEffect( () =>
    {
        if ( words.length === 0 ) return;

        const currentWord = words[ wordIndex ];

        const timeout = window.setTimeout( () =>
        {
            if ( !isDeleting )
            {
                const next = currentWord.slice( 0, text.length + 1 );

                setText( next );

                if ( next === currentWord )
                {
                    if ( !loop && wordIndex === words.length - 1 )
                    {
                        return;
                    }

                    window.setTimeout( () =>
                    {
                        setIsDeleting( true );
                    }, delay );
                }
            } else
            {
                const next = currentWord.slice( 0, text.length - 1 );

                setText( next );

                if ( next === "" )
                {
                    setIsDeleting( false );
                    setWordIndex( ( previous ) => ( previous + 1 ) % words.length );
                }
            }
        }, isDeleting ? deleteSpeed : typeSpeed );

        return () =>
        {
            clearTimeout( timeout );
        };
    }, [
        text,
        words,
        wordIndex,
        isDeleting,
        typeSpeed,
        deleteSpeed,
        delay,
        loop,
    ] );

    return {
        text,
        isDeleting,
        wordIndex,
    };
}