/* ========================================================================
 * editor.js
 * ------------------------------------------------------------------------
 * Contains formatting operations and visual effects for editor interaction
 * ======================================================================== */

/*
 * Executes a document formatting command (e.g., bold or italic),
 * toggles button state for visual feedback, and optionally triggers a callback.
 */
export function toggleFormat(command, $button, onChange) {
    document.execCommand(command);
    $button.toggleClass('blue');
    if (typeof onChange === 'function') {
        setTimeout(() => onChange(), 0);
    }
}

/*
 * Adds a temporary visual highlight class to an element
 * to provide feedback after an action (e.g., undo/redo).
 */
export function flash($el) {
    $el.addClass('flash');
    setTimeout(() => $el.removeClass('flash'), 400);
}