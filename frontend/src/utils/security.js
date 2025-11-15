/**
 * Username validation using standard regex pattern
 * Accepts: text, text+numbers, etc.
 * @param {string} username - Username to validate
 * @returns {boolean} - True if valid username
 */
export const validateUsername = ( username ) =>
{
    // More permissive regex that matches most valid email formats
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    return usernameRegex.test( username.trim() );
};




/**
 * Email validation using standard regex pattern
 * Accepts: user@example.com, user+tag@example.co.uk, etc.
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email
 */
export const validateEmail = ( email ) =>
{
    // More permissive regex that matches most valid email formats
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test( email.trim() );
};

/**
 * Password validation with security requirements
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * @param {string} password - Password to validate
 * @returns {string|null} - Error message or null if valid
 */
export const validatePassword = ( password ) =>
{
    if ( !password ) return "Password is required";
    if ( password.length < 8 ) return "Password must be at least 8 characters";
    if ( !/[A-Z]/.test( password ) ) return "Password must contain at least one uppercase letter";
    if ( !/[a-z]/.test( password ) ) return "Password must contain at least one lowercase letter";
    if ( !/[0-9]/.test( password ) ) return "Password must contain at least one number";
    return null;
};

/**
 * Sanitize input to prevent XSS attacks
 * @param {string} input - Input to sanitize
 * @returns {string} - Sanitized input
 */
export const sanitizeInput = ( input ) =>
{
    if ( typeof input !== "string" ) return "";

    const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
    };

    return input.replace( /[&<>"']/g, ( char ) => map[ char ] );
};

/**
 * Check if a string is safe (no suspicious patterns)
 * @param {string} input - Input to check
 * @returns {boolean} - True if safe
 */
export const isSafeInput = ( input ) =>
{
    if ( typeof input !== "string" ) return true;

    // Check for common XSS patterns
    const suspiciousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+\s*=/i, // event handlers
        /<iframe/i,
        /<object/i,
        /<embed/i,
    ];

    return !suspiciousPatterns.some( ( pattern ) => pattern.test( input ) );
};

/**
 * Hash a password using SubtleCrypto (browser-side, never send raw passwords)
 * Note: This is for client-side validation only. Always hash on the server!
 * @param {string} password - Password to hash
 * @returns {Promise<string>} - Hashed password in hex
 */
export const hashPassword = async ( password ) =>
{
    if ( typeof window === "undefined" ) return null;

    const encoder = new TextEncoder();
    const data = encoder.encode( password );
    const hashBuffer = await crypto.subtle.digest( "SHA-256", data );
    const hashArray = Array.from( new Uint8Array( hashBuffer ) );
    return hashArray.map( ( b ) => b.toString( 16 ).padStart( 2, "0" ) ).join( "" );
};

/**
 * Generate a CSRF token for form submissions
 * @returns {string} - CSRF token
 */
export const generateCSRFToken = () =>
{
    if ( typeof window === "undefined" ) return "";

    const array = new Uint8Array( 32 );
    crypto.getRandomValues( array );
    return Array.from( array, ( byte ) => byte.toString( 16 ).padStart( 2, "0" ) ).join( "" );
};

/**
 * Get CSRF token from cookies
 * @param {string} name - Cookie name
 * @returns {string|null} - Cookie value or null
 */
export const getCookie = ( name ) =>
{
    if ( typeof document === "undefined" ) return null;

    const nameEQ = `${ name }=`;
    const cookies = document.cookie.split( ";" );
    for ( let i = 0; i < cookies.length; i++ )
    {
        let cookie = cookies[ i ].trim();
        if ( cookie.indexOf( nameEQ ) === 0 )
        {
            return cookie.substring( nameEQ.length );
        }
    }
    return null;
};

/**
 * Set a secure HTTP-only cookie recommendation
 * Note: Can only be set from server in Next.js
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {number} days - Days until expiration
 */
export const setCookie = ( name, value, days = 7 ) =>
{
    if ( typeof document === "undefined" ) return;

    const date = new Date();
    date.setTime( date.getTime() + days * 24 * 60 * 60 * 1000 );
    const expires = `expires=${ date.toUTCString() }`;
    document.cookie = `${ name }=${ value };${ expires };path=/;Secure;SameSite=Strict`;
};

/**
 * Rate limiting check (client-side, should also be enforced server-side)
 * @param {string} key - Rate limit key
 * @param {number} maxAttempts - Max attempts allowed
 * @param {number} windowMs - Time window in milliseconds
 * @returns {boolean} - True if within limits
 */
export const checkRateLimit = ( key, maxAttempts = 5, windowMs = 15 * 60 * 1000 ) =>
{
    if ( typeof window === "undefined" ) return true;

    const storage = window.localStorage;
    const data = storage.getItem( `ratelimit_${ key }` );

    if ( !data )
    {
        storage.setItem( `ratelimit_${ key }`, JSON.stringify( { count: 1, timestamp: Date.now() } ) );
        return true;
    }

    const { count, timestamp } = JSON.parse( data );
    const now = Date.now();

    if ( now - timestamp > windowMs )
    {
        storage.setItem( `ratelimit_${ key }`, JSON.stringify( { count: 1, timestamp: now } ) );
        return true;
    }

    if ( count >= maxAttempts )
    {
        return false;
    }

    storage.setItem( `ratelimit_${ key }`, JSON.stringify( { count: count + 1, timestamp } ) );
    return true;
};
