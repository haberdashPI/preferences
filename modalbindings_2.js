function withCommand(command, args){
    return Object.fromEntries(Object.entries(args).map(([key, args]) =>
        [key, { command, args }]
    ))
}

module.exports = {keybindings: {
    /////////////
    // motions

    // basic movement
    h: { command: "cursorMove", args: { to: 'left', select: "__mode == 'visual'", value: '__count' } },
    j: { command: "cursorMove", args: { to: 'down', by: 'wrappedLine', select: "__mode == 'visual'", value: '__count' } },
    k: { command: "cursorMove", args: { to: 'up', by: 'wrappedLine', select: "__mode == 'visual'" , value: '__count' } },
    l: { command: "cursorMove", args: { to: 'right', select: "__mode == 'visual'", value: '__count' } },

    // regex movements
    ...withCommand("selection-utilities.moveBy", {
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
        p:     { unit: "paragraph",  boundary: "start", select     : true, value: '__count' } ,
        P:     { unit: "paragraph",  boundary: "start", select     : true, value: '-__count' },
        "up":  { unit: "paragraph",  boundary: "both", selectWhole: true, value: '__count' } ,
        "uP":  { unit: "paragraph",  boundary: "both", selectWhole: true, value: '-__count' },
        "gp":  { unit: "section",    boundary: "start", select:      true, value: '__count'  },
        "gP":  { unit: "section",    boundary: "start", select:      true, value: '-__count' },
        "gs":  { unit: "subsection", boundary: "start", select:      true, value: '__count'  },
        "gS":  { unit: "subsection", boundary: "start", select:      true, value: '-__count' },
        "ugp": { unit: "section",    boundary: "start", selectWhole: true, value: '__count'  },
        "ugP": { unit: "section",    boundary: "start", selectWhole: true, value: '-__count' },
        "ugs": { unit: "subsection", boundary: "start", selectWhole: true, value: '__count'  },
        "ugS": { unit: "subsection", boundary: "start", selectWhole: true, value: '-__count' },
    }),

    // function arguments
    ...withCommand("move-cursor-by-argument.move-by-argument", {
        "'w": { value: "__count", boundary: "start", select: true },
        "'b": { value: "-__count", boundary: "start", select: true },
        "'W": { value: "__count", boundary: "start", select: true },
        "'B": { value: "-__count", boundary: "end", select: true },
        "uqw": { value: "__count", boundary: "start", selectWhole: true },
        "uqb": { value: "-__count", boundary: "start", selectWhole: true },
        "uqW": { value: "__count", boundary: "start", selectWhole: true },
        "uqB": { value: "-__count", boundary: "end", selectWhole: true },
    }),

    // line related movements
    H: "cursorHomeSelect",
    L: { command: "cursorMove", args: { to: "wrappedLineEnd", select: true } },
    G:  "expandLineSelection",
    K: { command: "selection-utiliies.selectLines", args: { value: "-__count" } },
    J: { command: "selection-utiliies.selectLines", args: { value: "__count" } },

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

    "?": [
        {
            command: "modalkeys.search",
            args: {
                caseSensitive: true,
                backwards: false,
                selectTillMatch: true,
                wrapAround: true
            }
        },
    ],

    f: [
        {
            command: "modalkeys.search",
            args: {
                caseSensitive: true,
                acceptAfter: 1,
                backwards: false,
                selectTillMatch: true,
                wrapAround: true
            }
        },
    ],
    F: {
        command: "modalkeys.search",
        args: {
            caseSensitive: true,
            acceptAfter: 1,
            backwards: true,
            selectTillMatch: true,
            wrapAround: true
        }
    },
    t: {
        command: "modalkeys.search",
        args: {
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
        }
    },
    T: {
        command: "modalkeys.search",
        args: {
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
        }
    },
    s: {
        command: "modalkeys.search",
        args: {
            caseSensitive: true,
            acceptAfter: 2,
            backwards: false,
            selectTillMatch: true,
            typeAfterAccept: "hh",
            typeBeforeNextMatch: "ll",
            typeAfterNextMatch: "hh",
            wrapAround: true
        }
    },
    S: {
        command: "modalkeys.search",
        args: {
            casSensitive: true,
            acceptAfter: 2,
            backwards: true,
            selectTillMatch: true,
            typeBeforePreviousMatch: "ll",
            typeAfterPreviousMatch: "hh",
            wrapAround: true
        }
    },

    ////////////////////////
    // more complex syntactic selections

    // "I": "select-indentation.expand-selection",
    '%': "editor.action.jumpToBracket",
    "q": "extension.selectSingleQuote",
    "Q": "extension.selectDoubleQuote",
    // the below is a bit hacky; I want to add these commandsto my extension
    "[": "selection-utilities.select-in-bracket",
    "{": "selection-utilities.select-around-bracket",
    "`": "extension.selectBackTick",

    "g>": "extension.selectAngleBrackets",
    "g<": "extension.selectInTag",
    "g]": "vscode-select-by-indent.select-outer-top-only",

    "]": "vscode-select-by-indent.select-inner",
    "}": "vscode-select-by-indent.select-outer",

    ////////////////////////
    // selection modifiers

    R:  "selection-utilities.trimSelectionWhitespace" ,
    U: { command: "selection-utilities.narrowTo", args: { unit: "subident", boundary: "both", } },

    x:    "selection-utilities.addNext",
    "gx": "selection-utilities.addPrev" ,
    X:    "selection-utilities.skipNext",
    "gX": "selection-utilities.skipPrev" ,

    r: "modalkeys.cancelMultipleSelections",
    " ": "modalkeys.enableSelection",

    ///////////////////////////////////////////////////////
    // actions

    // insert/append text
    i: {
        condition: "editor.selection.isEmpty",
        true: "modalkeys.enterInsert",
        false: [
            {
                condition: "!editor.selection.isReversed",
                true: {
                    command: "cursorMove",
                    args: { to: "right", select: false, value: 0 }
                },
                false: {
                    command: "cursorMove",
                    args: { to: "left", select: false, value: 0 }
                }
            },
            "modalkeys.enterInsert"
        ]
    },

    a: {
        condition: "editor.selection.isEmpty",
        true: [
            {
                command: "cursorMove",
                args: { to: "right", select: false }
            },
            "modalkeys.enterInsert"
        ],
        false: [
            "selection-utilities.exchangeAnchorActive",
            {
                condition: "!editor.selection.isReversed",
                true: {
                    command: "cursorMove",
                    args: { to: "right", select: false, value: 0 }
                },
                false: {
                    command: "cursorMove",
                    args: { to: "left", select: false, value: 0 }
                }
            },
            "modalkeys.enterInsert"
        ]
    },

    I: [
        {
            command: "cursorMove",
            args: { to: "wrappedLineFirstNonWhitespaceCharacter", select: false }
        },
        "modalkeys.enterInsert",
    ],

    A: [
        {
            command: "cursorMove",
            args: { to: "wrappedLineEnd", select: false }
        },
        "modalkeys.enterInsert",
    ],

    // change
    c: [
        {
            condition: "!editor.selection.isSingleLine && editor.selection.end.character == 0 && editor.selection.start.character == 0",
            false: [
                "deleteRight",
                "modalkeys.enterInsert"
            ],
            true: [
                "deleteRight",
                "editor.action.insertLineBefore",
                "modalkeys.enterInsert"
            ]
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
            condition: "editor.selection.isEmpty",
            true: {
                command: "cursorMove",
                args: { to: "right", select: true }
            },
            false: [],
        },
        {
            condition: "__selection == __selection.toUpperCase()",
            true: "editor.action.transformToLowercase",
            false: "editor.action.transformToUppercase"
        },
        "modalkeys.cancelMultipleSelections",
    ],


    // update numerical selection
    "+": [
        {
            condition: "editor.selections.length === 1",
            true: "editor.emmet.action.incrementNumberByOne",
            false: "extension.incrementSelection",
        },
    ],
    "=": [
        {
            condition: "editor.selections.length === 1",
            true: "editor.emmet.action.decrementNumberByOne",
            false: "extension.decrementSelection",
        },
    ],

    // check
    "^": "markdown-checkbox.markCheckbox",

    "ga": "selection-utilities.trimWhitespace",

    // brackets
    "g{": [ "bracketeer.removeBrackets", ],
    "g[": [ "bracketeer.swapBrackets", ],
    "gq": [ "bracketeer.swapQuotes", ],
    "gQ": [ "bracketeer.removeQuotes", ],
    "'(": [ "modalkeys.enterInsert", { command: "type", args: { text: "(" }, }, "modalkeys.enterNormal" ],
    "'<": [ "modalkeys.enterInsert", { command: "type", args: { text: "<" }, }, "modalkeys.enterNormal" ],
    "'`": [ "modalkeys.enterInsert", { command: "type", args: { text: "`" }, }, "modalkeys.enterNormal" ],
    "'\"": [ "modalkeys.enterInsert", { command: "type", args: { "text": "\"" }, }, "modalkeys.enterNormal" ],
    "''": [ "modalkeys.enterInsert", { command: "type", args: { text: "'" }, }, "modalkeys.enterNormal" ],
    "'*": [ "modalkeys.enterInsert", { command: "type", args: { text: "*" }, }, "modalkeys.enterNormal" ],
    "'2*": [ "modalkeys.enterInsert", { command: "type", args: { text: "**" }, }, "modalkeys.enterNormal" ],
    "'{": [ "modalkeys.enterInsert", { command: "type", args: { text: "{" }, }, "modalkeys.enterNormal" ],
    "'[": [ "modalkeys.enterInsert", { command: "type", args: { text: "[" }, }, "modalkeys.enterNormal" ],

    /////////////
    // clipboard actions

    // cut to clipboard
    d: {
        condition: "__count == 1",
        true: "editor.action.clipboardCutAction",
        false: [
            "modalkeys.cancelMultipleSelections",
            {
                command: "cursorMove",
                args: {to: "wrappedLineStart", select: false}
            },
            {
                command: "cursorMove",
                args: { to: 'down', select: true, value: '__count+1' }
            },
            "editor.action.clipboardCutAction",
        ]
    },

    D: [
        "modalkeys.cancelMultipleSelections",
        {
            command: "cursorMove",
            args: { to: "wrappedLineEnd", select: true }
        },
        "editor.action.clipboardCutAction",
    ],

    "\\": [
        {
            condition: "editor.selection.isEmpty",
            true: [],
            false: ["modalkeys.cancelMultipleSelections"],
        },
        {
            command: "cursorMove",
            args: { to: "right", select: true }
        },
        "editor.action.clipboardCutAction",
    ],

    // copy to clipboard
    y: [
        "editor.action.clipboardCopyAction",
        {
            condition: "!editor.selection.isReversed",
            true: {
                command: "cursorMove",
                args: { to: "right", select: false, value: 0 }
            },
            false: {
                command: "cursorMove",
                args: { to: "left", select: false, value: 0 }
            }
        },
    ],

    // copy line to clipboard
    Y: [
        {
            command: "cursorMove",
            args: { to: "wrappedLineEnd", select: true }
        },
        "editor.action.clipboardCopyAction",
        "modalkeys.cancelMultipleSelections"
    ],

    // paste after
    v: [
        { condition: "!editor.selection.isEmpty",
            true: {
                command: "cursorMove",
                args: { to: "right", select: false, value: 0 }
            },
            false: "cursorRight"
        },
        "editor.action.clipboardPasteAction",
    ],

    // paste before
    V: [
        {
            condition: "!editor.selection.isEmpty",
            true: {
                command: "cursorMove",
                args: { to: "left", select: false, value: 0 }
            },
            false: []
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
        { condition: "!editor.selection.isEmpty",
            true: {
                command: "cursorMove",
                args: { to: "right", select: false, value: 0 }
            },
            false: "cursorRight"
        },
        "editor.action.clipboardPasteAction",
    ],

    // paste lines above
    "gI": [
        "expandLineSelection",
        {
            condition: "!editor.selection.isEmpty",
            true: {
                command: "cursorMove",
                args: { to: "left", select: false, value: 0 }
            },
            false: []
        },
        "editor.action.clipboardPasteAction",
    ],


    // begin line below
    o: [
        {
            condition: "editor.selection.isEmpty",
            true: "editor.action.insertLineAfter",
            false: {
                condition: "!editor.selection.isReversed",
                true: "editor.action.insertLineBefore",
                false: [
                    "selection-utilities.exchangeAnchorActive",
                    "editor.action.insertLineBefore",
                ]
            }
        },
        "modalkeys.enterInsert",
    ],
    O: [
        {
            condition: "editor.selection.isEmpty",
            true: "editor.action.insertLineBefore",
            false: {
                condition: "editor.selection.isReversed",
                true: "editor.action.insertLineBefore",
                false: [
                    "selection-utilities.exchangeAnchorActive",
                    "editor.action.insertLineBefore",
                ]
            }
        },
        "modalkeys.enterInsert",
    ],

    // line indent
    ">": "editor.action.indentLines",
    "<": "editor.action.outdentLines",

    ":": "workbench.action.quickOpen",

    ///////////////////////
    // history

    z: [
        "undo",
        {
            condition: "!editor.selection.isReversed",
            true: {
                command: "cursorMove",
                args: { to: "right", select: false, value: 0 }
            },
            false: {
                command: "cursorMove",
                args: { to: "left", select: false, value: 0 }
            }
        },
    ],
    Z: [
        "redo",
        {
            condition: "!editor.selection.isReversed",
            true: {
                command: "cursorMove",
                args: { to: "right", select: false, value: 0 }
            },
            false: {
                command: "cursorMove",
                args: { to: "left", select: false, value: 0 }
            }
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
            condition: "!editor.selection.isEmpty",
            true: {
                condition: "!editor.selection.isReversed",
                true: {
                    command: "cursorMove",
                    args: { to: "right", select: false, value: 0 }
                },
                false: {
                    command: "cursorMove",
                    args: { to: "left", select: false, value: 0 }
                }
            },
            false: []
        },
    ],
    "g:": [
        "editor.action.blockComment",
        {
            condition: "!editor.selection.isEmpty",
            true: {
                condition: "!editor.selection.isReversed",
                true: {
                    command: "cursorMove",
                    args: { to: "right", select: false, value: 0 }
                },
                false: {
                    command: "cursorMove",
                    args: { to: "left", select: false, value: 0 }
                }
            },
            false: []
        },
    ],
    "gq": "rewrap.rewrapComment",

    /////////////
    // terminal actions
    "gl": [
        "terminal-polyglot.send-text",
        "modalkeys.cancelMultipleSelections",
    ],
    "gL": [
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
    "gc": { command: "revealLine", args: "{ lineNumber: __line, at: 'center' }" },
    "gt": { command: "revealLine", args: "{ lineNumber: __line, at: 'top' }" },
    "gT": { command: "revealLine", args: "{ lineNumber: __line, at: 'bottom' }" },
    "gh": "editor.action.showHover",
    "gg": "editor.action.revealDefinition",
    "gG": "editor.action.revealDefinitionAside",

    //////////
    // bookmarks
    "gn": [
        {
            command: "modalkeys.defineBookmark",
            args: { bookmark: "default" }
        },
    ],
    "gm": [
        {
            command: "modalkeys.goToBookmark",
            args: { bookmark: "default" }
        },
    ],


    ///////////////
    // selection modiefiers
    "'=": "selection-utilities.alignSelectionsLeft",
    "'+": "selection-utilities.alignSelectionsRight",

    // selection modifiers
    "'h": "selection-utilities.activeAtStart",
    "'l": "selection-utilities.activeAtEnd",
    "'j": "selection-utilities.movePrimaryRight",
    "'k": "selection-utilities.movePrimaryLeft",
    "'c": "selection-utilities.appendToMemory",
    "'v": "selection-utilities.restoreAndClear",
    "'x": "selection-utilities.swapWithMemory",
    "'n": "selection-utilities.deleteLastSaved",
    "'d": "selection-utilities.deletePrimary",
    "'s": "selection-utilities.splitByNewline",
    "'S": "selection-utilities.splitBy",
    "'g": "selection-utilities.createBy",
    "'G": "selection-utilities.createByRegex",
    "'r": "selection-utilities.splitByRegex",
    "'f": "selection-utilities.includeBy",
    "'F": "selection-utilities.excludeBy",
    "'t": "selection-utilities.includeByRegex",
    "'T": "selection-utilities.excludeByRegex",
    "'-": {
        command: "selection-utilities.restoreAndClear",
        args: {register: "cancel"}
    },
}}