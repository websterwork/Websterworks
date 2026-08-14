"use client";

/**
 * -----------------------------------------------------------------------------
 * useIntersection
 * -----------------------------------------------------------------------------
 *
 * Observes when an element enters or leaves the viewport.
 *
 * Useful for:
 * • Reveal Animations
 * • Lazy Loading
 * • Infinite Scroll
 * • Image Loading
 * • Scroll Effects
 * • Animated Counters
 *
 * -----------------------------------------------------------------------------
 */

import
    {
        RefObject,
        useEffect,
        useState,
    } from "react";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface UseIntersectionOptions
    extends IntersectionObserverInit
{
    /**
     * Observe only once.
     */
    once?: boolean;
}

/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */

export function useIntersection<T extends HTMLElement> (
    ref: RefObject<T | null>,
    {
        threshold = 0,
        root = null,
        rootMargin = "0px",
        once = false,
    }: UseIntersectionOptions = {},
): boolean
{
    const [ isIntersecting, setIsIntersecting ] = useState( false );

    useEffect( () =>
    {
        const element = ref.current;

        if ( !element ) return;

        const observer = new IntersectionObserver(
            ( [ entry ] ) =>
            {
                const visible = entry.isIntersecting;

                setIsIntersecting( visible );

                if ( visible && once )
                {
                    observer.disconnect();
                }
            },
            {
                threshold,
                root,
                rootMargin,
            },
        );

        observer.observe( element );

        return () =>
        {
            observer.disconnect();
        };
    }, [ ref, threshold, root, rootMargin, once ] );

    return isIntersecting;
}