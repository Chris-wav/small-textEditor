/* ========================================================================
 * main.js
 * ------------------------------------------------------------------------
 * Entry point of the editor application.
 * Sets up all event listeners, handlers, and module integrations.
 * ======================================================================== */

import { History } from '/js-ds/undo-redo/js/history.js';
import { debounce } from '/js-ds/undo-redo/js/utils.js';
import { toggleFormat, flash } from '/js-ds/undo-redo/js/editor.js';

$(function () {
    const $input = $('.input-area');
    const $bold = $('.bold');
    const $italic = $('.italic');
    const $undo = $('.undo');
    const $redo = $('.redo');

    // Initialize the history module with current editor content
    const history = new History($input.html());
    const debouncedPush = debounce(() => history.push($input.html()), 500);

    // Handle bold formatting
    $bold.on('click', () => toggleFormat('bold', $bold, () => history.push($input.html())));

    // Handle italic formatting
    $italic.on('click', () => toggleFormat('italic', $italic, () => history.push($input.html())));

    // Track input changes and push to history with debounce
    $input.on('input', () => debouncedPush());

    // Handle undo action
    $undo.on('click', () => {
        const prev = history.undo();
        if (prev !== null) {
            $input.html(prev);
            flash($input);
        }
    });

    // Handle redo action
    $redo.on('click', () => {
        const next = history.redo();
        if (next !== null) {
            $input.html(next);
            flash($input);
        }
    });

    // Keyboard shortcuts for undo/redo actions
    $(document).on('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
            e.preventDefault();
            $undo.click();
        }
        if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'Z'))) {
            e.preventDefault();
            $redo.click();
        }
    });
});
