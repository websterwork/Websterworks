/**
 * -----------------------------------------------------------------------------
 * API Types
 * -----------------------------------------------------------------------------
 *
 * Shared types for API requests and responses.
 *
 * -----------------------------------------------------------------------------
 */

import type { Dictionary, Status } from "./common";

/* -------------------------------------------------------------------------- */
/* API Error                                                                  */
/* -------------------------------------------------------------------------- */

export interface ApiError
{
    /**
     * Error message.
     */
    message: string;

    /**
     * Optional error code.
     */
    code?: string;

    /**
     * Validation errors.
     */
    errors?: Dictionary<string[]>;
}

/* -------------------------------------------------------------------------- */
/* API Meta                                                                   */
/* -------------------------------------------------------------------------- */

export interface ApiMeta
{
    /**
     * Current page.
     */
    page?: number;

    /**
     * Items per page.
     */
    limit?: number;

    /**
     * Total items.
     */
    total?: number;

    /**
     * Total pages.
     */
    totalPages?: number;
}

/* -------------------------------------------------------------------------- */
/* API Response                                                               */
/* -------------------------------------------------------------------------- */

export interface ApiResponse<T>
{
    /**
     * Request success.
     */
    success: boolean;

    /**
     * Response data.
     */
    data: T;

    /**
     * Optional message.
     */
    message?: string;

    /**
     * Optional metadata.
     */
    meta?: ApiMeta;
}

/* -------------------------------------------------------------------------- */
/* API Error Response                                                         */
/* -------------------------------------------------------------------------- */

export interface ApiErrorResponse
{
    success: false;

    error: ApiError;

    message?: string;
}

/* -------------------------------------------------------------------------- */
/* API State                                                                  */
/* -------------------------------------------------------------------------- */

export interface ApiState<T>
{
    data: T | null;

    error: ApiError | null;

    status: Status;
}

/* -------------------------------------------------------------------------- */
/* Pagination                                                                 */
/* -------------------------------------------------------------------------- */

export interface PaginationParams
{
    page?: number;

    limit?: number;

    sort?: string;

    order?: "asc" | "desc";

    search?: string;
}