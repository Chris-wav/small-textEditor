// UI bindings - Connects buttons and shortcuts with actions
export function bindUI($els, editor, history) {
    const { $input, $bold, $italic, $undo, $redo } = $els;

    $bold.on('click', function () {
        editor.applyBold();
        $(this).toggleClass('blue');
        history.push();
    });

    $italic.on('click', function () {
        editor.applyItalic();
        $(this).toggleClass('blue');
        history.push();
    });

    $undo.on('click', history.undo);
    $redo.on('click', history.redo);

    $input.on('input', history.push);

    $(document).on('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
            e.preventDefault();
            history.undo();
        }
        if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'Z'))) {
            e.preventDefault();
            history.redo();
        }
    });
}
