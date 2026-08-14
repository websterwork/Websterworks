"use client";

/**
 * -----------------------------------------------------------------------------
 * useLogoTheme
 * -----------------------------------------------------------------------------
 *
 * Reads CSS theme variables from global.css and keeps them synchronized
 * with Three.js whenever the theme changes.
 *
 * -----------------------------------------------------------------------------
 */

import { useEffect, useState } from "react";

export interface LogoTheme
{
    primary: string;
    accent: string;
    background: string;
    foreground: string;
}

export function useLogoTheme (): LogoTheme
{
    const readTheme = (): LogoTheme =>
    {
        const styles = getComputedStyle( document.documentElement );

        return {
            primary: styles.getPropertyValue( "--primary" ).trim(),

            accent: styles.getPropertyValue( "--accent" ).trim(),

            background: styles
                .getPropertyValue( "--background" )
                .trim(),

            foreground: styles
                .getPropertyValue( "--foreground" )
                .trim(),
        };
    };

    const [ theme, setTheme ] = useState<LogoTheme>( {
        primary: "",
        accent: "",
        background: "",
        foreground: "",
    } );

    useEffect( () =>
    {
        const updateTheme = () =>
        {
            setTheme( readTheme() );
        };

        updateTheme();

        const observer = new MutationObserver( updateTheme );

        observer.observe( document.documentElement, {
            attributes: true,
            attributeFilter: [ "class" ],
        } );

        return () => observer.disconnect();
    }, [] );

    return theme;
}