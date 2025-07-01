/**
 * Initializes the editor with text formatting capabilities (bold, italic)
 * and history management (undo/redo).
 * 
 * @param {jQuery} $input - The text input element (contenteditable)
 * @param {Object} history - The object managing history states
 * @returns {Object} - An object with methods applyBold and applyItalic
 */
export function initEditor($input, history) {

    /**
     * Removes the specified tag element but keeps its inner content intact.
     * 
     * For example: if we have <strong>text</strong>, this removes the <strong>
     * tag and leaves just the text.
     * 
     * @param {HTMLElement} element - The element (e.g. <strong> or <em>) to unwrap
     */
    function unwrapTag(element) {
        const parent = element.parentNode;

        // Move all child nodes of 'element' to be siblings right before 'element'
        while (element.firstChild) {
            parent.insertBefore(element.firstChild, element);
        }

        // Remove the now empty element from the DOM
        parent.removeChild(element);
    }

    /**
     * Toggles formatting by wrapping or unwrapping the selected text
     * with the specified tag (e.g. <strong> or <em>).
     * 
     * If the selection is already wrapped in the tag, unwrap it.
     * Otherwise, wrap the selection in the tag.
     * 
     * @param {string} tagName - The tag name to toggle (e.g. 'strong', 'em')
     */
    function toggleTag(tagName) {
        const selection = window.getSelection();

        // If there's no selection, do nothing
        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);

        // If the selection is collapsed (no actual selected text), do nothing
        if (range.collapsed) return;

        // Find the common ancestor container of the selection
        let ancestor = range.commonAncestorContainer;

        // If ancestor is a text node, get its parent element instead
        if (ancestor.nodeType === 3) ancestor = ancestor.parentNode;

        // Check if the selection is already wrapped inside the target tag
        // closest() finds the nearest ancestor with the tagName
        const wrapped = ancestor.closest ? ancestor.closest(tagName) : null;

        if (wrapped) {
            // If wrapped, unwrap the tag to remove formatting
            unwrapTag(wrapped);
        } else {
            // If not wrapped, wrap the selection in the specified tag
            const content = range.extractContents(); // Remove the selected content from the DOM

            const wrapper = document.createElement(tagName); // Create the wrapper element (e.g. <strong>)
            wrapper.appendChild(content); // Append the selected content inside the wrapper

            range.insertNode(wrapper); // Insert the wrapper back into the DOM at the selection

            // Restore the selection to cover the newly inserted wrapper content
            selection.removeAllRanges();
            const newRange = document.createRange();
            newRange.selectNodeContents(wrapper);
            selection.addRange(newRange);
        }

        // Save the current state to the history stack for undo/redo
        history.push();
    }

    return {
        applyBold: () => toggleTag('strong'),
        applyItalic: () => toggleTag('em')
    };
}
