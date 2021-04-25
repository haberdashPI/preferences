module.exports = {keybindings: {
    /////////////
    // motions

    // basic movement
    h: { "cursorMove": { to: 'left', select: "__mode == 'visual'", value: '__count' } },
    j: { "cursorMove": { to: 'down', by: 'wrappedLine', select: "__mode == 'visual'", value: '__count' } },
    k: { "cursorMove": { to: 'up', by: 'wrappedLine', select: "__mode == 'visual'" , value: '__count' } },
    l: { "cursorMove": { to: 'right', select: "__mode == 'visual'", value: '__count' } },

    // regex movements
    "::using::selection-utilities.moveBy": {
        // word-like
        w:     { unit: "subword", boundary: "start", select:      true, value: '__count' } ,
        "uw":  { unit: "subword", boundary: "start", selectWhole: true, value: '__count' } ,
        W:     { unit: "word",    boundary: "start", select:      true, value: '__count' } ,
        "uW":  { unit: "word",    boundary: "start", selectWhole: true, value: '__count' } ,
        e:     { unit: "word",    boundary: "end",   select:      true, value: '__count' } ,
        "ue":  { unit: "word",    boundary: "end",   selectWhole: true, value: '__count' } ,
        b:     { unit: "subword", boundary: "start", select:      true, value: '-__count' } ,
        "ub":  { unit: "subword", boundary: "start", selectWhole: true, value: '-__count' } ,
        B:     { unit: "word",    boundary: "start", select:      true, value: '-__count' } ,
        "uB":  { unit: "word",    boundary: "start", selectWhole: true, value: '-__count' } ,
        E:     { unit: "word",    boundary: "end",   select:      true, value: '-__count' } ,
        "uE":  { unit: "word",    boundary: "end",   selectWhole: true, value: '-__count' } ,
        "gw":  { unit: "WORD",    boundary: "start", select:      true, value: "__count" },
        "ugw": { unit: "WORD",    boundary: "start", selectWhole: true, value: "__count" },
        "gb":  { unit: "WORD",    boundary: "start", select:      true, value: "-__count" },
        "ugb": { unit: "WORD",    boundary: "start", selectWhole: true, value: "-__count" },
        "gW":  { unit: "WORD",    boundary: "end",   select:      true, value: "__count" },
        "ugW": { unit: "WORD",    boundary: "end",   selectWhole: true, value: "__count" },
        "gB":  { unit: "WORD",    boundary: "end",   select:      true, value: "-__count" },
        "ugB": { unit: "WORD",    boundary: "end",   selectWhole: true, value: "-__count" },

        // numbers
        "@": { value: '-__count', unit: "integer", boundary: "both", selectWhole: true } ,
        "#": { value: '__count', unit: "integer", boundary: "both", selectWhole: true } ,

        // comments
        "';": { unit: "comment", boundary: "both", selectWhole: true, value: '__count'},
        "':": { unit: "comment", boundary: "both", selectWhole: true, value: '-__count'},

        // paragraphs and sections
        p:     { unit: "paragraph",  boundary: "start", select     : true, value: '__count'  },
        P:     { unit: "paragraph",  boundary: "start", select     : true, value: '-__count' },
        "up":  { unit: "paragraph",  boundary: "both",  selectWhole: true, value: '__count'  },
        "uP":  { unit: "paragraph",  boundary: "both",  selectWhole: true, value: '-__count' },
        "gp":  { unit: "section",    boundary: "start", select:      true, value: '__count'  },
        "gP":  { unit: "section",    boundary: "start", select:      true, value: '-__count' },
        "gs":  { unit: "subsection", boundary: "start", select:      true, value: '__count'  },
        "gS":  { unit: "subsection", boundary: "start", select:      true, value: '-__count' },
        "ugp": { unit: "section",    boundary: "start", selectWhole: true, value: '__count'  },
        "ugP": { unit: "section",    boundary: "start", selectWhole: true, value: '-__count' },
        "ugs": { unit: "subsection", boundary: "start", selectWhole: true, value: '__count'  },
        "ugS": { unit: "subsection", boundary: "start", selectWhole: true, value: '-__count' },
    },

    // function arguments
    "::using::move-cursor-by-argument.move-by-argument": {
        "'w":  { value: "__count",  boundary: "start", select:      true },
        "'b":  { value: "-__count", boundary: "start", select:      true },
        "'W":  { value: "__count",  boundary: "start", select:      true },
        "'B":  { value: "-__count", boundary: "end",   select:      true },
        "ufw": { value: "__count",  boundary: "start", selectWhole: true },
        "ufb": { value: "-__count", boundary: "start", selectWhole: true },
        "ufW": { value: "__count",  boundary: "start", selectWhole: true },
        "ufB": { value: "-__count", boundary: "end",   selectWhole: true },
    },

    // line related movements
    H: "cursorHomeSelect",
    L: { "cursorMove": { to: "wrappedLineEnd", select: true } },
    G:  "expandLineSelection",
    K: [
        { "modalkeys.typeKeys": { keys: "` ${__count}kG`" } },
        "selection-utilities.activeAtStart"
    ],
    J: { "modalkeys.typeKeys": { keys: "` ${__count}jG`" } },

    // buffer related
    $: [ "editor.action.selectAll" ],
    "gj": "cursorBottomSelect",
    "gk": "cursorTopSelect",

    // search related
    "/": "actions.find",
    "*": [
        "actions.find",
        "editor.action.nextMatchFindAction",
        "closeFindWidget"
    ],
    "&": [
        "actions.find",
        "editor.action.previousMatchFindAction",
        "closeFindWidget"
    ],

    n: "editor.action.nextMatchFindAction",
    N: "editor.action.previousMatchFindAction",
    ";": "modalkeys.nextMatch",
    ",": "modalkeys.previousMatch",

    "?": { "modalkeys.search": {
        caseSensitive: true,
        backwards: false,
        selectTillMatch: true,
        wrapAround: true
    } },
    f: { "modalkeys.search": {
        caseSensitive: true,
        acceptAfter: 1,
        backwards: false,
        selectTillMatch: true,
        wrapAround: true
    }},
    F: { "modalkeys.search": {
        caseSensitive: true,
        acceptAfter: 1,
        backwards: true,
        selectTillMatch: true,
        wrapAround: true
    }},
    t: { "modalkeys.search": {
        caseSensitive: true,
        acceptAfter: 1,
        backwards: false,
        selectTillMatch: true,
        typeAfterAccept: "h",
        typeBeforeNextMatch: "l",
        typeAfterNextMatch: "h",
        typeBeforePreviousMatch: "h",
        typeAfterPreviousMatch: "l",
        wrapAround: true
    }},
    T: { "modalkeys.search": {
        caseSensitive: true,
        acceptAfter: 1,
        backwards: true,
        selectTillMatch: true,
        typeAfterAccept: "l",
        typeBeforeNextMatch: "h",
        typeAfterNextMatch: "l",
        typeBeforePreviousMatch: "l",
        typeAfterPreviousMatch: "h",
        wrapAround: true
    }},
    s: { "modalkeys.search": {
        caseSensitive: true,
        acceptAfter: 2,
        backwards: false,
        selectTillMatch: true,
        typeAfterAccept: "hh",
        typeBeforeNextMatch: "ll",
        typeAfterNextMatch: "hh",
        wrapAround: true
    }},
    S: { "modalkeys.search": {
        casSensitive: true,
        acceptAfter: 2,
        backwards: true,
        selectTillMatch: true,
        typeBeforePreviousMatch: "ll",
        typeAfterPreviousMatch: "hh",
        wrapAround: true
    }},

    ////////////////////////
    // more complex syntactic selections

    // "I": "select-indentation.expand-selection",
    '%': "editor.action.jumpToBracket",
    "''": "extension.selectSingleQuote",
    "'\"": "extension.selectDoubleQuote",
    // the below is a bit hacky; I want to add these commandsto my extension
    "[": [
        {
            if: "!editor.selection.isEmpty",
            then: [
                "selection-utilities.activeAtStart",
                { "cursorMove": { "to": "left", "select": true, "value": 2 } },
                "selection-utilities.activeAtEnd",
                { "cursorMove": { "to": "right", "select": true, "value": 2 } }
            ],
        },
        { "editor.action.selectToBracket": {"selectBrackets": false} }
    ],
    "{": [
        {
            if: "!editor.selection.isEmpty",
            then: [
                "selection-utilities.activeAtStart",
                { "cursorMove": { "to": "left", "select": true } },
                "selection-utilities.activeAtEnd",
                { "cursorMove": { "to": "right", "select": true } }
            ],
        },
        { "editor.action.selectToBracket": {"selectBrackets": true} }
    ],
    "`": "extension.selectBackTick",

    "g>": "extension.selectAngleBrackets",
    "g<": "extension.selectInTag",
    "g]": "vscode-select-by-indent.select-outer-top-only",

    "]": "vscode-select-by-indent.select-inner",
    "}": "vscode-select-by-indent.select-outer",

    ////////////////////////
    // selection modifiers

    R: [ "expandLineSelection", "selection-utilities.trimSelectionWhitespace" ],
    "visual::R":  "selection-utilities.trimSelectionWhitespace" ,
    U: { "selection-utilities.narrowTo": { unit: "subident", boundary: "both", } },

    x:  { "selection-utilities.addNext": {}, repeat: '__count' },
    gx: { "selection-utilities.addPrev": {}, repeat: '__count' },
    X:  { "selection-utilities.skipNext": {}, repeat: '__count' },
    gX: { "selection-utilities.skipPrev": {}, repeat: '__count' },

    r: "modalkeys.cancelMultipleSelections",
    " ": "modalkeys.enableSelection",

    ///////////////////////////////////////////////////////
    // actions

    // insert/append text
    i: [ "modalkeys.cancelMultipleSelections", "modalkeys.enterInsert" ],
    a: [ "modalkeys.cancelMultipleSelections", { if: "__char != ''", then: "cursorRight" }, "modalkeys.enterInsert"],

    I: [
        { "cursorMove": { to: "wrappedLineFirstNonWhitespaceCharacter", select: false } },
        "modalkeys.enterInsert",
    ],

    A: [ { "cursorMove": { to: "wrappedLineEnd", select: false } }, "modalkeys.enterInsert", ],

    // change
    c: [
        {
            if: "!editor.selection.isSingleLine && editor.selection.end.character == 0 && editor.selection.start.character == 0",
            then: [
                "deleteRight",
                "editor.action.insertLineBefore",
                "modalkeys.enterInsert"
            ],
            else: [
                "deleteRight",
                "modalkeys.enterInsert"
            ],
        },
    ],

    C: [
        "modalkeys.cancelMultipleSelections",
        "deleteAllRight",
        "modalkeys.enterInsert",
    ],

    "gy": "editor.action.joinLines",

    "~": [
        {
            if: "editor.selection.isEmpty",
            then: {
                "cursorMove":
                { to: "right", select: true }
            },
        },
        {
            if: "__selection == __selection.toUpperCase()",
            then: "editor.action.transformToLowercase",
            else: "editor.action.transformToUppercase"
        },
        "modalkeys.cancelMultipleSelections",
    ],


    // update numerical selection
    "+": [
        {
            if: "editor.selections.length === 1",
            then: "editor.emmet.action.incrementNumberByOne",
            else: "extension.incrementSelection",
        },
    ],
    "=": [
        {
            if: "editor.selections.length === 1",
            then: "editor.emmet.action.decrementNumberByOne",
            else: "extension.decrementSelection",
        },
    ],

    // check
    "^": "markdown-checkbox.markCheckbox",

    "ga": "selection-utilities.trimWhitespace",

    // brackets
    "'d[":  "bracketeer.removeBrackets",
    "'s[":  "bracketeer.swapBrackets",
    "'s\"":  "bracketeer.swapQuotes",
    "'d\"":  "bracketeer.removeQuotes",
    "'i(": [ "modalkeys.enterInsert", { "type": { text: "(" }, }, "modalkeys.enterNormal" ],
    "'i<": [ "modalkeys.enterInsert", { "type": { text: "<" }, }, "modalkeys.enterNormal" ],
    "'i`": [ "modalkeys.enterInsert", { "type": { text: "`" }, }, "modalkeys.enterNormal" ],
    "'i\"": [ "modalkeys.enterInsert", { "type": { "text": "\"" }, }, "modalkeys.enterNormal" ],
    "'i'": [ "modalkeys.enterInsert", { "type": { text: "'" }, }, "modalkeys.enterNormal" ],
    "'i*": [ "modalkeys.enterInsert", { "type": { text: "*" }, }, "modalkeys.enterNormal" ],
    // "'i2*": [ "modalkeys.enterInsert", { "type": { text: "**" }, }, "modalkeys.enterNormal" ],
    "'i{": [ "modalkeys.enterInsert", { "type": { text: "{" }, }, "modalkeys.enterNormal" ],
    "'i[": [ "modalkeys.enterInsert", { "type": { text: "[" }, }, "modalkeys.enterNormal" ],

    /////////////
    // clipboard actions

    // cut to clipboard
    d: {
        if: "__count == 1",
        then: "editor.action.clipboardCutAction",
        else: [
            "modalkeys.cancelMultipleSelections",
            {
                "cursorMove":
                {to: "wrappedLineStart", select: false}
            },
            {
                "cursorMove":
                { to: 'down', select: true, value: '__count+1' }
            },
            "editor.action.clipboardCutAction",
        ]
    },

    D: [
        "modalkeys.cancelMultipleSelections",
        { "cursorMove": { to: "wrappedLineEnd", select: true } },
        "editor.action.clipboardCutAction",
    ],

    "\\": [
        {
            if: "editor.selection.isEmpty",
            then: [],
            else: ["modalkeys.cancelMultipleSelections"],
        },
        { "cursorMove": { to: "right", select: true } },
        "editor.action.clipboardCutAction",
    ],

    // copy to clipboard
    y: [
        "editor.action.clipboardCopyAction",
        {
            if: "!editor.selection.isReversed",
            then: { "cursorMove": { to: "right", select: false, value: 0 } },
            else: { "cursorMove": { to: "left", select: false, value: 0 } }
        },
    ],

    // copy line to clipboard
    Y: [
        { "cursorMove": { to: "wrappedLineEnd", select: true } },
        "editor.action.clipboardCopyAction",
        "modalkeys.cancelMultipleSelections"
    ],

    // paste after
    v: [
        {
            if: "!editor.selection.isEmpty",
            then: { "cursorMove": { to: "right", select: false, value: 0 } },
            else: "cursorRight"
        },
        "editor.action.clipboardPasteAction",
    ],

    // paste before
    V: [
        {
            if: "!editor.selection.isEmpty",
            then: { "cursorMove": { to: "left", select: false, value: 0 } },
            else: []
        },
        "editor.action.clipboardPasteAction",
    ],

    // paste and replace
    "gV": "editor.action.clipboardPasteAction",

    // paste from history
    "gv": "clipboard-manager.editor.pickAndPaste" ,


    // paste lines below
    "gi": [
        "expandLineSelection",
        { if: "!editor.selection.isEmpty",
            then: { "cursorMove": { to: "right", select: false, value: 0 } },
            else: "cursorRight"
        },
        "editor.action.clipboardPasteAction",
    ],

    // paste lines above
    "gI": [
        "expandLineSelection",
        {
            if: "!editor.selection.isEmpty",
            then: { "cursorMove": { to: "left", select: false, value: 0 } },
            else: []
        },
        "editor.action.clipboardPasteAction",
    ],


    // begin line below
    o: ["editor.action.insertLineAfter", "modalkeys.enterInsert"],
    "visual::o": "selection-utilities.activeAtStart",
    O: [ "editor.action.insertLineBefore", "modalkeys.enterInsert" ],
    "visual::O": "selection-utilities.activeAtEnd",

    // line indent
    ">": "editor.action.indentLines",
    "<": "editor.action.outdentLines",

    ":": "workbench.action.quickOpen",

    ///////////////////////
    // history

    z: [
        "undo",
        {
            if: "!editor.selection.isReversed",
            then: { "cursorMove": { to: "right", select: false, value: 0 } },
            else: { "cursorMove": { to: "left", select: false, value: 0 } }
        },
    ],
    Z: [
        "redo",
        {
            if: "!editor.selection.isReversed",
            then: { "cursorMove": { to: "right", select: false, value: 0 } },
            else: { "cursorMove": { to: "left", select: false, value: 0 } }
        },
    ],
    "-": "cursorUndo",
    "_": "cursorRedo",

    ".": [
        "modalkeys.repeatLastSelection",
        "modalkeys.repeatLastChange",
    ],

    /////////////
    // comment actions
    "g;": [
        "editor.action.commentLine",
        {
            if: "!editor.selection.isEmpty",
            then: {
                if: "!editor.selection.isReversed",
                then: { "cursorMove": { to: "right", select: false, value: 0 } },
                else: { "cursorMove": { to: "left", select: false, value: 0 } }
            },
            else: []
        },
    ],
    "g:": [
        "editor.action.blockComment",
        {
            if: "!editor.selection.isEmpty",
            then: {
                if: "!editor.selection.isReversed",
                then: { "cursorMove": { to: "right", select: false, value: 0 } },
                else: { "cursorMove": { to: "left", select: false, value: 0 } }
            },
            else: []
        },
    ],
    "gq": "rewrap.rewrapComment",

    /////////////
    // terminal actions
    "\n": [
        "terminal-polyglot.send-text",
        "modalkeys.cancelMultipleSelections",
    ],
    "g\n": [
        "terminal-polyglot.send-block-text",
        "modalkeys.cancelMultipleSelections",
    ],

    ///////////////////
    // git/version control
    "gr": "git.stageSelectedRanges",
    "gR": "git.unstageSelectedRanges",
    "ge": "editor.action.marker.next",
    "gE": "editor.action.marker.prev",
    "gd": "editor.action.dirtydiff.next",
    "gD": "editor.action.dirtydiff.previous",
    "gf": "workbench.action.editor.nextChange",
    "gF": "workbench.action.editor.previousChange",

    /////////////
    // window manipulation
    "gc": { "revealLine": { lineNumber: '__line', at: 'center' } },
    "gt": { "revealLine": { lineNumber: '__line', at: 'top' } },
    "gT": { "revealLine": { lineNumber: '__line', at: 'bottom' } },
    "gh": "editor.action.showHover",
    "gg": "editor.action.revealDefinition",
    "gG": "editor.action.revealDefinitionAside",

    //////////
    // bookmarks
    "gn": { "modalkeys.defineBookmark": { bookmark: "default" } },
    "gm": { "modalkeys.goToBookmark": { bookmark: "default" } },

    ///////////////
    // selection modiefiers
    "'=": "selection-utilities.alignSelectionsLeft",
    "'+": "selection-utilities.alignSelectionsRight",

    // selection modifiers
    "'c": "selection-utilities.appendToMemory",
    "'v": "selection-utilities.restoreAndClear",
    "'x": "selection-utilities.swapWithMemory",
    "'n": "selection-utilities.deleteLastSaved",
    "'-": { "selection-utilities.restoreAndClear": {register: "cancel"} },

    "\"": { "modalkeys.enterMode": { mode: "selectedit" } },
    "selectedit::r": [ "modalkeys.enterNormal", "modalkeys.cancelMultipleSelections" ],
    "selectedit::h": "selection-utilities.activeAtStart",
    "selectedit::l": "selection-utilities.activeAtEnd",
    "selectedit::j": { "selection-utilities.movePrimaryRight": {}, repeat: '__count' },
    "selectedit::k": { "selection-utilities.movePrimaryLeft": {}, repeat: '__count' },
    "selectedit::d": { "selection-utilities.deletePrimary": {}, repeat: '__count' },
    "selectedit::sj": "selection-utilities.splitByNewline",
    "selectedit::sc": "selection-utilities.splitBy",
    "selectedit::cc": "selection-utilities.createBy",
    "selectedit::cr": "selection-utilities.createByRegex",
    "selectedit::sr": "selection-utilities.splitByRegex",
    "selectedit::ic": "selection-utilities.includeBy",
    "selectedit::ec": "selection-utilities.excludeBy",
    "selectedit::ir": "selection-utilities.includeByRegex",
    "selectedit::er": "selection-utilities.excludeByRegex",
    "selectedit::\"": { "modalkeys.enterMode": { mode: "normal" } },
}}