/* ========================================================================
 * history.js
 * ------------------------------------------------------------------------
 * Manages the undo and redo history of the editor by maintaining two stacks:
 * - stack: stores all committed editor states
 * - redoStack: stores undone states for reapplication
 * ======================================================================== */

export class History {
    constructor(initial = "") {
        this.stack = [initial];      // Stores current content states
        this.redoStack = [];         // Stores undone states for potential redo
    }

    /*
     * Pushes a new editor state onto the history stack and
     * clears any redo history to maintain proper sequencing.
     */
    push(state) {
        this.stack.push(state);
        this.redoStack = [];
    }

    /*
     * Performs an undo operation by reverting to the previous
     * editor state, if one exists.
     */
    undo() {
        if (this.stack.length > 1) {
            const last = this.stack.pop();
            this.redoStack.push(last);
            return this.stack[this.stack.length - 1];
        }
        return null;
    }

    /*
     * Performs a redo operation by restoring the last undone
     * editor state, if one exists.
     */
    redo() {
        if (this.redoStack.length > 0) {
            const restored = this.redoStack.pop();
            this.stack.push(restored);
            return restored;
        }
        return null;
    }
}
