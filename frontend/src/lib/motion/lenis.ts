/**
 * Shared Lenis Smooth Scroll Configuration Profiles.
 */

export const lenisPresets = {
    default: {
        duration: 1.2,
        easing: ( t: number ) => Math.min( 1, 1.001 - Math.pow( 2, -10 * t ) ),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
    },
    snappy: {
        duration: 0.8,
        easing: ( t: number ) => 1 - Math.pow( 1 - t, 4 ),
        smoothWheel: true,
        wheelMultiplier: 1.2,
        touchMultiplier: 1.5,
    },
    luxurious: {
        duration: 1.8,
        easing: ( t: number ) => ( t === 1 ? 1 : 1 - Math.pow( 2, -10 * t ) ),
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.8,
    },
} as const;