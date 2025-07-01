// Entry point - initializes editor components after DOM is fully loaded
import { initEditor } from './editor.js';
import { initHistory } from './history.js';
import { bindUI } from './ui.js';

$(function () {
    // Cache jQuery selectors for main UI elements
    const $input = $('.input-area');
    const $bold = $('.bold');
    const $italic = $('.italic');
    const $undo = $('.undo');
    const $redo = $('.redo');

    // Initialize history management for undo/redo functionality
    const history = initHistory($input);

    // Initialize editor with formatting capabilities and link to history
    const editor = initEditor($input, history);

    // Bind UI events (button clicks, input changes) to editor and history logic
    bindUI({ $input, $bold, $italic, $undo, $redo }, editor, history);
});