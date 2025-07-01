/**
 * Creates a debounced version of a function.
 * This delays the execution of the function until after a specified wait time
 * has elapsed since the last time it was invoked.
 *
 * @param {Function} func - The function to debounce.
 * @param {number} [wait=300] - The number of milliseconds to wait before invoking the function.
 * @returns {Function} - A new debounced function.
 */
export function debounce(func, wait = 300) {
    let timeout;

    return function (...args) {
        // Clear the previous timeout if the function is called again before wait time
        clearTimeout(timeout);

        // Set a new timeout to execute the function after the delay
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
