/**
 * Shared easing curves for Motion, GSAP, and CSS animations.
 */

// Standard Motion String Easings
export const easings = {
    linear: "linear",
    easeIn: "easeIn",
    easeOut: "easeOut",
    easeInOut: "easeInOut",
    circIn: "circIn",
    circOut: "circOut",
    circInOut: "circInOut",
    backIn: "backIn",
    backOut: "backOut",
    backInOut: "backInOut",
    anticipate: "anticipate",
} as const;

// Precision Cubic Bezier Tuples
export const cubicBezier = {
    smooth: [ 0.25, 0.1, 0.25, 1 ],
    gentle: [ 0.22, 1, 0.36, 1 ],
    snappy: [ 0.34, 1.56, 0.64, 1 ],
    premium: [ 0.16, 1, 0.3, 1 ],
    dramatic: [ 0.68, -0.6, 0.32, 1.6 ],
    bounceOut: [ 0.34, 1.8, 0.64, 1 ],
} as const;

// GSAP Easing Formats
export const gsapEasings = {
    power1In: "power1.in",
    power1Out: "power1.out",
    power1InOut: "power1.inOut",
    power2In: "power2.in",
    power2Out: "power2.out",
    power2InOut: "power2.inOut",
    power3In: "power3.in",
    power3Out: "power3.out",
    power3InOut: "power3.inOut",
    power4In: "power4.in",
    power4Out: "power4.out",
    power4InOut: "power4.inOut",
    expoOut: "expo.out",
    expoInOut: "expo.inOut",
    backOut: "back.out(1.7)",
    backInOut: "back.inOut(1.7)",
    elasticOut: "elastic.out(1, 0.3)",
    bounceOut: "bounce.out",
} as const;