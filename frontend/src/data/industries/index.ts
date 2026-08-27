/**
 * -----------------------------------------------------------------------------
 * Industries Data
 * -----------------------------------------------------------------------------
 *
 * Central export for all industries.
 *
 * -----------------------------------------------------------------------------
 */

import { ITTechnologyIndustry } from "./ITTechnology";
import { HealthcareIndustry } from "./Healthcare";
import { FinanceIndustry } from "./Finance";
import { EducationIndustry } from "./Education";
import { IoTIndustry } from "./IOT";

export const industries = [
    ITTechnologyIndustry,
    HealthcareIndustry,
    FinanceIndustry,
    EducationIndustry,
    IoTIndustry,
];

export * from "./types";