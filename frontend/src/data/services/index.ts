/**
 * -----------------------------------------------------------------------------
 * Services Data
 * -----------------------------------------------------------------------------
 *
 * Central export for all services.
 *
 * -----------------------------------------------------------------------------
 */

import { AIService } from "./AI";

// Temporary
 import { WebDevelopmentService } from "./Web";
// import { MobileDevelopmentService } from "./services/Mobile";
import { GraphicsDesignService } from "./Graphics";
 import { SEOService } from "./SEO";
// import { CyberSecurityService } from "./services/Cyber";

export const services = [
    AIService,

   WebDevelopmentService,
    // MobileDevelopmentService,
     GraphicsDesignService,
     SEOService,
    // CyberSecurityService,
];

export * from "./types";