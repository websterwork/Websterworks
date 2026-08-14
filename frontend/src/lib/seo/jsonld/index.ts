/**
 * -----------------------------------------------------------------------------
 * JSON-LD Exports
 * -----------------------------------------------------------------------------
 * Central export for all Schema.org generators.
 *
 * Usage:
 *
 * import {
 *   organizationSchema,
 *   websiteSchema,
 *   webpageSchema,
 *   breadcrumbSchema,
 *   serviceSchema,
 *   industrySchema,
 *   faqSchema,
 *   blogPostingSchema,
 *   localBusinessSchema,
 * } from "@/lib/seo/jsonld";
 * -----------------------------------------------------------------------------
 */

/* -------------------------------------------------------------------------- */
/* Shared Types                                                               */
/* -------------------------------------------------------------------------- */

export * from "./types";

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

export * from "./helpers";

/* -------------------------------------------------------------------------- */
/* Schemas                                                                    */
/* -------------------------------------------------------------------------- */

export * from "./organization";

export * from "./website";

export * from "./webpage";

export * from "./breadcrumbs";

export * from "./service";

export * from "./industry";

export * from "./faq";

export * from "./blog-posting";

export * from "./local-business";