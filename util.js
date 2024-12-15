/*******************************************************
 * Don't worry about anything below this line. 
 * It's all utility functions—you're good to go! 😌
 *******************************************************/

// Just so you can use logLevels.error rather than remembering "1" = error
const logLevels = {
    off: 0,
    error: 1,
    warning: 2,
    debug: 3,
};

// Adjust this to 'off', 'error', 'warning', or 'debug'
let currentLogLevel = logLevels.debug;

// Silly little wrapper around the console log function so you can quickly enable logging or not
function log(level, message, ...data) {
    if (currentLogLevel >= level) {
        const method = level === logLevels.error ? "error" : level === logLevels.warning ? "warn" : "log";
        console[method](message, ...data);
    }
};

// Enhanced Random Number Generator with Smart Precision
function rng(low, high, decimals = null) {
    const lowDecimals = (low.toString().split(".")[1] || "").length;
    const highDecimals = (high.toString().split(".")[1] || "").length;
    const derivedDecimals = Math.max(lowDecimals, highDecimals); // Derive max precision

    const randomValue = Math.random() * (high - low) + low;

    // If decimals is explicitly set, use it; otherwise, use derived precision
    return decimals !== null
        ? parseFloat(randomValue.toFixed(decimals))
        : parseFloat(randomValue.toFixed(derivedDecimals));
}

// Local Storage Utility with Logging Levels and Key Listing
const storage = (() => {
    return {
        /**
         * Save a value to localStorage.
         * @param {string} key - The key under which the value will be stored.
         * @param {any} value - The value to store (will be stringified if it's not a string).
         */
        save: (key, value) => {
            log(logLevels.debug, `Saving key "${key}" with value:`, value);
            localStorage.setItem(key, JSON.stringify(value));
        },

        /**
         * Load a value from localStorage.
         * @param {string} key - The key of the value to retrieve.
         * @param {any} [defaultValue=null] - The default value to return if the key doesn't exist.
         * @returns {any} - The parsed value if JSON, the raw string if not JSON, or the default value if the key doesn't exist.
         */
        load: (key, defaultValue = null) => {
            const value = localStorage.getItem(key);
            if (value === null) {
                log(logLevels.warning, `No value found for key "${key}". Returning default value:`, defaultValue);
                return defaultValue;
            }

            try {
                log(logLevels.debug, `Value found for key "${key}". Returning value:`, value);
                return JSON.parse(value); // Parse JSON if possible
            } catch (err) {
                log(logLevels.error, `Failed to parse value for key "${key}":`, value, err);
                return value; // Return raw string if parsing fails
            }
        },

        /**
         * List all keys currently in localStorage.
         * @returns {string[]} - An array of keys in localStorage.
         */
        listKeys: () => {
            const keys = Object.keys(localStorage);
            log(logLevels.debug, `Available keys in localStorage:`, keys);
            return keys;
        }
    };
})();
