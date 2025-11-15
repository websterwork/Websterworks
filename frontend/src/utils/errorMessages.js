/**
 * Safe error handler - converts backend errors to user-friendly messages
 * Hides sensitive information like CSRF tokens, network details, etc.
 */

const ERROR_MAPPING = {
    // Authentication errors - user facing
    "invalid credentials": "Invalid email or password. Please try again.",
    "invalid email": "Invalid email format. Please check and try again.",
    "invalid password": "Password must be at least 8 characters with uppercase, lowercase, and number.",
    "email already exists": "This email is already registered. Please log in or use a different email.",
    "email not found": "Email not found. Please check and try again.",
    "user not found": "User not found. Please sign up first.",
    "passwords do not match": "Passwords do not match. Please try again.",
    "password too weak": "Password is too weak. Please use a stronger password.",

    // Generic user-safe errors
    "failed to fetch": "Network error. Please check your connection and try again.",
    "network error": "Network error. Please check your connection and try again.",
    "cannot connect": "Cannot connect to server. Please try again later.",
    "server error": "Server error. Please try again later.",
    "request timeout": "Request timeout. Please try again.",

    // Not found errors
    "not found": "Resource not found. Please try again.",
    "404": "Page not found.",

    // Authorization errors
    "unauthorized": "Please log in to continue.",
    "forbidden": "You don't have permission to access this resource.",
    "token expired": "Your session has expired. Please log in again.",
};

/**
 * Map backend errors to user-friendly messages
 * @param {string} backendError - Error message from backend
 * @param {string} context - Context of the error (login, signup, etc.)
 * @returns {string} User-friendly error message
 */
export function getSafeErrorMessage ( backendError = "", context = "" )
{
    if ( !backendError )
    {
        // Generic fallback
        if ( context === "login" ) return "Login failed. Please try again.";
        if ( context === "signup" ) return "Signup failed. Please try again.";
        if ( context === "logout" ) return "Logout failed. Please try again.";
        return "An error occurred. Please try again.";
    }

    const errorLower = backendError.toLowerCase();

    // Check for exact matches first
    for ( const [ key, message ] of Object.entries( ERROR_MAPPING ) )
    {
        if ( errorLower.includes( key ) )
        {
            return message;
        }
    }

    // Context-specific fallbacks
    if ( context === "login" )
    {
        return "Login failed. Please check your email and password and try again.";
    }
    if ( context === "signup" )
    {
        return "Signup failed. Please check your information and try again.";
    }

    // Don't expose backend errors - return generic message
    return "An error occurred. Please try again later.";
}

/**
 * Filter out sensitive console logs
 * Used to prevent console from showing CSRF tokens or sensitive headers
 */
export function sanitizeForLogging ( message )
{
    if ( !message || typeof message !== "string" ) return message;

    // Remove CSRF token values
    const sanitized = message
        .replace( /csrfToken['":\s]+['"]*([a-zA-Z0-9/+]+)['"]*|XSRF-TOKEN['":\s]+['"]*([a-zA-Z0-9/+]+)['"]/g, "csrfToken: [REDACTED]" )
        .replace( /x-csrf-token['":\s]+['"]*([a-zA-Z0-9/+]+)['"]/gi, "x-csrf-token: [REDACTED]" )
        .replace( /Bearer [a-zA-Z0-9._-]+/g, "Bearer [REDACTED]" );

    return sanitized;
}

/**
 * Check if error is safe to show to user
 * @param {string} error - Error message
 * @returns {boolean} True if error is safe to show
 */
export function isSafeErrorToShow ( error )
{
    if ( !error ) return false;

    const unsafeKeywords = [
        "csrf",
        "token",
        "header",
        "middleware",
        "database",
        "connection",
        "stack",
        "mongodb",
        "query",
        "document",
        "schema",
    ];

    const errorLower = error.toLowerCase();
    return !unsafeKeywords.some( keyword => errorLower.includes( keyword ) );
}
