/* ========================================================================
 * utils.js
 * ------------------------------------------------------------------------
 * Utility functions for general-purpose operations
 * ======================================================================== */

/*
 * Creates a debounced version of a function that delays its execution
 * until after a specified delay has elapsed since the last invocation.
 */
export function debounce(fn, delay) {
    let timerId;
    return function (...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => fn.apply(this, args), delay);
    };
}