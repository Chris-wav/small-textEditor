$(function () {
    const $input = $('.input-area'); // contenteditable element
    const $undo = $('.undo');
    const $redo = $('.redo');
    const $bold = $('.bold');
    const $italic = $('.italic');

    const stack = [''];
    const redoStack = [];

    const debouncedStackPush = debounce(stackPush, 500);

    // Bold toggle
    $bold.on('click', function () {
        document.execCommand('bold');
        $bold.toggleClass('blue');
        setTimeout(() => stackPush(), 0);
    });

    // Italic toggle
    $italic.on('click', function () {
        document.execCommand('italic');
        $italic.toggleClass('blue');
        setTimeout(() => stackPush(), 0);
    });

    // Keyboard shortcuts
    $(document).on('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
            e.preventDefault();
            undo();
        }

        if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'Z'))) {
            e.preventDefault();
            redo();
        }
    });

    $input.on('input', function () {
        debouncedStackPush();
    });

    $undo.on('click', undo);
    $redo.on('click', redo);

    function stackPush() {
        stack.push($input.html());
        redoStack.length = 0;
        console.log("Stack:", stack);
    }

    function undo() {
        if (stack.length > 1) {
            const lastState = stack.pop();
            redoStack.push(lastState);
            $input.html(stack[stack.length - 1]);
        }
        flashInput();
    }

    function redo() {
        if (redoStack.length > 0) {
            const restored = redoStack.pop();
            stack.push(restored);
            $input.html(restored);
        }
        flashInput();
    }

    function flashInput() {
        $input.addClass("flash");
        setTimeout(() => $input.removeClass("flash"), 400);
    }

    function debounce(fn, delay) {
        let timerId;
        return function (...args) {
            clearTimeout(timerId);
            timerId = setTimeout(() => fn.apply(this, args), delay);
        };
    }
});
