$(function () {
    const $input = $('.input-area'); // contenteditable element
    const $undo = $('.undo');
    const $redo = $('.redo');
    const $bold = $('.bold');
    const $italic = $('.italic');

    const stack = [''];
    const redoStack = [];

    const debouncedStackPush = debounce(stackPush, 500);

    // Bold toggle (θα αντικατασταθεί με applyBold)
    $bold.on('click', function () {
        applyBold(); // η δική σου συνάρτηση χωρίς execCommand
        $bold.toggleClass('blue');
        setTimeout(() => stackPush(), 0);
    });

    // Italic toggle (θα αντικατασταθεί με applyItalic)
    $italic.on('click', function () {
        applyItalic(); // η δική σου συνάρτηση χωρίς execCommand
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
    function applyBold() {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        const selectedText = range.cloneContents();

        toggleBold();

        const strong = document.createElement("strong");
        strong.appendChild(range.extractContents());
        range.insertNode(strong);
    }


    function applyItalic() {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;
        const range = getSelection.getRangeAt();
        const italic = document.createElement('em');
        italic.appendChild(range.extractContents());
        range.insertNode(italic);

    }

    function toggleItalic() {
        const firstNode = selectedText.firstChild;
        if (firstNode || firstNode.nodeName === 'italic') {
            const inner = firstNode.innerHTML || firstNode.textContent;
            range.deleteContents();
            range.insertNode(document.createTextNode(inner))
        }

    }

    function toggleBold() {
        const firstNode = selectedText.firstChild;
        if (firstNode && firstNode.nodeName === 'strong') {
            const inner = firstNode.innerHTML || firstNode.textContent;
            range.deleteContents();
            range.insertNode(document.createTextNode(inner));
            return;
        }
    }
});
