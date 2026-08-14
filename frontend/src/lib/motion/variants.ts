/**
 * -----------------------------------------------------------------------------
 * Shared Framer Motion Variants
 * -----------------------------------------------------------------------------
 *
 * Defines reusable animation states.
 *
 * NOTE:
 * Variants intentionally DO NOT contain transitions.
 * Transitions are supplied by animation wrapper components
 * (FadeIn, Reveal, Stagger, etc.) for maximum flexibility.
 *
 * -----------------------------------------------------------------------------
 */

import { Variants } from "motion/react";

/* -------------------------------------------------------------------------- */
/* Fade                                                                       */
/* -------------------------------------------------------------------------- */

export const fade: Variants = {
    hidden: {
        opacity: 0,
    },

    visible: {
        opacity: 1,
    },

    exit: {
        opacity: 0,
    },
};

/* -------------------------------------------------------------------------- */
/* Fade Up                                                                    */
/* -------------------------------------------------------------------------- */

export const fadeUp: Variants = {
    hidden: {
        opacity: 0,
        y: 40,
    },

    visible: {
        opacity: 1,
        y: 0,
    },

    exit: {
        opacity: 0,
        y: 20,
    },
};

/* -------------------------------------------------------------------------- */
/* Fade Down                                                                  */
/* -------------------------------------------------------------------------- */

export const fadeDown: Variants = {
    hidden: {
        opacity: 0,
        y: -40,
    },

    visible: {
        opacity: 1,
        y: 0,
    },

    exit: {
        opacity: 0,
        y: -20,
    },
};

/* -------------------------------------------------------------------------- */
/* Fade Left                                                                  */
/* -------------------------------------------------------------------------- */

export const fadeLeft: Variants = {
    hidden: {
        opacity: 0,
        x: 40,
    },

    visible: {
        opacity: 1,
        x: 0,
    },

    exit: {
        opacity: 0,
        x: 20,
    },
};

/* -------------------------------------------------------------------------- */
/* Fade Right                                                                 */
/* -------------------------------------------------------------------------- */

export const fadeRight: Variants = {
    hidden: {
        opacity: 0,
        x: -40,
    },

    visible: {
        opacity: 1,
        x: 0,
    },

    exit: {
        opacity: 0,
        x: -20,
    },
};

/* -------------------------------------------------------------------------- */
/* Scale                                                                      */
/* -------------------------------------------------------------------------- */

export const scale: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.9,
    },

    visible: {
        opacity: 1,
        scale: 1,
    },

    exit: {
        opacity: 0,
        scale: 0.95,
    },
};

/* -------------------------------------------------------------------------- */
/* Zoom                                                                       */
/* -------------------------------------------------------------------------- */

export const zoom: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.7,
    },

    visible: {
        opacity: 1,
        scale: 1,
    },

    exit: {
        opacity: 0,
        scale: 0.8,
    },
};

/* -------------------------------------------------------------------------- */
/* Rotate                                                                     */
/* -------------------------------------------------------------------------- */

export const rotate: Variants = {
    hidden: {
        opacity: 0,
        rotate: -10,
        scale: 0.95,
    },

    visible: {
        opacity: 1,
        rotate: 0,
        scale: 1,
    },

    exit: {
        opacity: 0,
        rotate: 5,
        scale: 0.95,
    },
};

/* -------------------------------------------------------------------------- */
/* Drop & Bounce                                                              */
/* -------------------------------------------------------------------------- */

export const dropAndBounce: Variants = {
    hidden: {
        opacity: 0,
        y: -100,
    },

    visible: {
        opacity: 1,
        y: 0,
    },

    exit: {
        opacity: 0,
        y: -100,
    },
};

/* -------------------------------------------------------------------------- */
/* Slide Out Top                                                              */
/* -------------------------------------------------------------------------- */

export const slideOutTop: Variants = {
    hidden: {
        opacity: 0,
        y: -20,
    },

    visible: {
        opacity: 1,
        y: 0,
    },

    exit: {
        opacity: 0,
        y: -20,
    },
};

/* -------------------------------------------------------------------------- */
/* Stagger Container                                                          */
/* -------------------------------------------------------------------------- */

export const staggerContainer: Variants = {
    hidden: {},

    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.05,
        },
    },
};

/* -------------------------------------------------------------------------- */
/* Hero Container                                                             */
/* -------------------------------------------------------------------------- */

export const heroContainer: Variants = {
    hidden: {},

    visible: {
        transition: {
            staggerChildren: 0.18,
            delayChildren: 0.2,
        },
    },
};