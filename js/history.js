// History module - Provides undo and redo functionality for the editor
import { debounce } from './utils.js';

export function initHistory($input) {
    // Stack to keep track of the states for undo operations
    const stack = ['']; // Initialize with an empty string (initial content)

    // Stack to keep track of states for redo operations
    const redoStack = [];

    /**
     * Adds the current content of the input element to the undo stack.
     * 
     * Uses debounce to limit how often states are saved (every 500ms),
     * preventing excessive saves on rapid input.
     */
    const push = debounce(() => {
        stack.push($input.html()); // Save current HTML content to stack
        redoStack.length = 0;      // Clear the redo stack on new changes
    }, 500);

    /**
     * Undo the last change.
     * 
     * Removes the latest state from the undo stack and moves it to the redo stack,
     * then restores the input's content to the previous state.
     */
    function undo() {
        if (stack.length > 1) {
            const last = stack.pop();     // Remove the latest state
            redoStack.push(last);          // Push it to the redo stack
            $input.html(stack[stack.length - 1]); // Restore previous state
        }
        flash(); // Provide visual feedback for the undo action
    }

    /**
     * Redo the previously undone change.
     * 
     * Restores the last undone state by popping it from the redo stack,
     * pushing it back to the undo stack, and updating the input content.
     */
    function redo() {
        if (redoStack.length > 0) {
            const restored = redoStack.pop();  // Get the last undone state
            stack.push(restored);               // Push it back to undo stack
            $input.html(restored);              // Restore content
        }
        flash(); // Visual feedback for redo action
    }

    /**
     * Temporarily adds a CSS class to the input element to visually
     * indicate that an undo or redo operation occurred.
     */
    function flash() {
        $input.addClass('flash'); // Add flash effect class
        setTimeout(() => $input.removeClass('flash'), 400); // Remove after 400ms
    }

    // Expose the API: push to save state, undo, and redo methods
    return { push, undo, redo };
}
