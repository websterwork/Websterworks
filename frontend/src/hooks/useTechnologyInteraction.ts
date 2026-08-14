"use client";

/**
 * -----------------------------------------------------------------------------
 * useTechnologyInteraction
 * -----------------------------------------------------------------------------
 *
 * Handles all mouse interaction inside the Technology Cloud.
 *
 * Responsibilities
 * • Track mouse position
 * • Convert browser coordinates → container coordinates
 * • Detect mouse enter / leave
 * • Expose physics configuration
 *
 * -----------------------------------------------------------------------------
 */

import
    {
        useEffect,
        useState,
        type RefObject,
    } from "react";

export interface TechnologyInteractionConfig
{
    repulsionRadius: number;

    repulsionStrength: number;

    damping: number;

    returnForce: number;

    particleSpacing: number;
}

export interface TechnologyInteractionState
{
    mouse: {
        x: number;
        y: number;
    };

    inside: boolean;

    width: number;

    height: number;

    config: TechnologyInteractionConfig;
}

interface UseTechnologyInteractionProps
{
    containerRef: RefObject<HTMLDivElement | null>;

    width: number;

    height: number;
}

export function useTechnologyInteraction ( {
    containerRef,
    width,
    height,
}: UseTechnologyInteractionProps ): TechnologyInteractionState
{
    const [ mouse, setMouse ] = useState( {
        x: -9999,
        y: -9999,
    } );

    const [ inside, setInside ] = useState( false );

    useEffect( () =>
    {
        const container = containerRef.current;

        if ( !container ) return;

        const handleMouseMove = ( event: MouseEvent ) =>
        {
            const rect = container.getBoundingClientRect();

            const x = event.clientX - rect.left;

            const y = event.clientY - rect.top;

            setMouse( {
                x,
                y,
            } );

            setInside(
                x >= 0 &&
                x <= rect.width &&
                y >= 0 &&
                y <= rect.height,
            );
        };

        const handleMouseEnter = () =>
        {
            setInside( true );
        };

        const handleMouseLeave = () =>
        {
            setInside( false );

            setMouse( {
                x: -9999,
                y: -9999,
            } );
        };

        container.addEventListener( "mousemove", handleMouseMove );

        container.addEventListener( "mouseenter", handleMouseEnter );

        container.addEventListener( "mouseleave", handleMouseLeave );

        return () =>
        {
            container.removeEventListener(
                "mousemove",
                handleMouseMove,
            );

            container.removeEventListener(
                "mouseenter",
                handleMouseEnter,
            );

            container.removeEventListener(
                "mouseleave",
                handleMouseLeave,
            );
        };
    }, [ containerRef ] );

    return {
        mouse,

        inside,

        width,

        height,

        config: {
            repulsionRadius: 220,

            repulsionStrength: 3,

            damping: 0.985,

            returnForce: 0.02,

            particleSpacing: 12,
        },
    };
}