function withCommand(command, args){
    return Object.fromEntries(Object.entries(arglist).map(([key, args]) => {
        [key, {
            command,
            args: args
        }]
    }))
}

function expandModes(bindings, modes){
    let result = {}
    for(mode of modes){
        result[mode] = filterByMode(bindings, mode)
    }
}

function filterByMode(bindings, mode){
    Object.fromEntires(Object.entries(bindings).filter(([key, val]) => {
        !val.mode || val.mode.split(',').some(x => x == mode)
    }).map(([key, val]) => {
        if(val.mode && val.commands){
            return [key, val.commands]
        }else{
            return [key, val]
        }
    }))
}

function expandSequences(bindings){
    let allEntries = Object.entries(bindings).map(([key, val]) => {
        if(key.length > 1){
            let obj = val
            for(let i = key.length-1; i>=0; i--){
                obj = {[key[i]]: obj}
            }
            return [key, obj]
        }else return [key, val]
    })
    result = {}
    for(let entry of allEntries){
        result[entry[0]] = deepMerge(result[entry[0]], entry[1])
    }
    return result
}
function isObject(item){
    return item && typeof(item) === 'object' && !Array.isArray(item);
}
function deepMerge(a, b){
    if(isObject(a) && isObject(b)){
        for(const key in b){
            if(!a[key]){
                a[key] = b[key]
            }else{
                a[key] = deepMerge(a[key], b[key])
            }
        }
        return a
    }else{
        return b
    }
}

function expandBindings(bindings){
    return expandModes(expandSequences(bindings))
}

const bindings = expandBindings({
    /////////////
    // motions

    // basic movement
    h: { command: "cursorMove", args: { to: 'left', select: "__selecting" } },
    j: { command: "cursorMove", args: { to: 'down', by: 'wrappedLine', select: "__selecting" } },
    k: { command: "cursorMove", args: { to: 'up', by: 'wrappedLine', select: "__selecting" } },
    l: { command: "cursorMove", args: { to: 'right', select: "__selecting" } },

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
        "q;": { unit: "comment", boundary: "both", selectWhole: true, value: '__count'},
        "q:": { unit: "comment", boundary: "both", selectWhole: true, value: '-__count'},

        // paragraphs and sections
        p:     { unit: "paragraph",  boundary: "start", select     : true, value: '__count' } ,
        P:     { unit: "paragraph",  boundary: "start", select     : true, value: '-__count' },
        "up":  { unit: "paragraph",  boundary: "whole", selectWhole: true, value: '__count' } ,
        "uP":  { unit: "paragraph",  boundary: "start", selectWhole: true, value: '-__count' },
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
        "qw": { value: "__count", boundary: "start", select: true },
        "qb": { value: "-__count", boundary: "start", select: true },
        "qW": { value: "__count", boundary: "start", select: true },
        "qB": { value: "-__count", boundary: "end", select: true },
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
    ";": "modaledit.nextMatch",
    ",": "modaledit.previousMatch",

    "?": [
        {
            command: "modaledit.search",
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
            command: "modaledit.search",
            args: {
                caseSensitive: true,
                acceptAfter: 1,
                backwards: false,
                selectTillMatch: true,
                wrapAround: true
            }
        },
    ],
    F: [
        {
            command: "modaledit.search",
            args: {
                caseSensitive: true,
                acceptAfter: 1,
                backwards: true,
                selectTillMatch: true,
                wrapAround: true
            }
        },
    ],

    t: [
        {
            command: "modaledit.search",
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
    ],
    T: [
        {
            command: "modaledit.search",
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
    ],

    s: [
        {
            command: "modaledit.search",
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
    ],
    S: [
        {
            command: "modaledit.search",
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
    ],

    ////////////////////////
    // more complex syntactic selections

    // "I": "select-indentation.expand-selection",
    '%': "editor.action.jumpToBracket",
    "'": "extension.selectSingleQuote",
    "\\": "extension.selectDoubleQuote",
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

    r: "modaledit.cancelMultipleSelections",
    " ": "modaledit.enableSelection",

    ///////////////////////////////////////////////////////
    // actions

    // insert/append text
    i: {
        condition: "editor.selection.isEmpty",
        true: "modaledit.enterInsert",
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
            "modaledit.enterInsert"
        ]
    },

    a: {
        condition: "editor.selection.isEmpty",
        true: [
            {
                command: "cursorMove",
                args: { to: "right", select: false }
            },
            "modaledit.enterInsert"
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
            "modaledit.enterInsert"
        ]
    },

    I: [
        {
            command: "cursorMove",
            args: { to: "wrappedLineFirstNonWhitespaceCharacter", select: false }
        },
        "modaledit.enterInsert",
    ],

    A: [
        {
            command: "cursorMove",
            args: { to: "wrappedLineEnd", select: false }
        },
        "modaledit.enterInsert",
    ],

    // change
    c: [
        {
            condition: "!editor.selection.isSingleLine && editor.selection.end.character == 0 && editor.selection.start.character == 0",
            false: [
                "deleteRight",
                "modaledit.enterInsert"
            ],
            true: [
                "deleteRight",
                "editor.action.insertLineBefore",
                "modaledit.enterInsert"
            ]
        },
    ],

    C: [
        "modaledit.cancelMultipleSelections",
        "deleteAllRight",
        "modaledit.enterInsert",
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
        "modaledit.cancelMultipleSelections",
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
    "g'": [ "bracketeer.swapQuotes", ],
    "\"": [ "bracketeer.removeQuotes", ],
    "q(": [ "modaledit.enterInsert", { command: "type", args: { text: "(" }, }, "modaledit.enterNormal" ],
    "q<": [ "modaledit.enterInsert", { command: "type", args: { text: "<" }, }, "modaledit.enterNormal" ],
    "q`": [ "modaledit.enterInsert", { command: "type", args: { text: "`" }, }, "modaledit.enterNormal" ],
    "q\"": [ "modaledit.enterInsert", { command: "type", args: { "text": "\"" }, }, "modaledit.enterNormal" ],
    "q'": [ "modaledit.enterInsert", { command: "type", args: { text: "'" }, }, "modaledit.enterNormal" ],
    "q*": [ "modaledit.enterInsert", { command: "type", args: { text: "*" }, }, "modaledit.enterNormal" ],
    "q2*": [ "modaledit.enterInsert", { command: "type", args: { text: "**" }, }, "modaledit.enterNormal" ],
    "q{": [ "modaledit.enterInsert", { command: "type", args: { text: "{" }, }, "modaledit.enterNormal" ],
    "q[": [ "modaledit.enterInsert", { command: "type", args: { text: "[" }, }, "modaledit.enterNormal" ],

    /////////////
    // clipboard actions

    // cut to clipboard
    d: {
        condition: "__count == 1",
        true: "editor.action.clipboardCutAction",
        false: [
            "modaledit.cancelMultipleSelections",
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
        "modaledit.cancelMultipleSelections",
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
            false: ["modaledit.cancelMultipleSelections"],
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
        "modaledit.cancelMultipleSelections"
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
        "modaledit.enterInsert",
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
        "modaledit.enterInsert",
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
        "modaledit.repeatLastSelection",
        "modaledit.repeatLastChange",
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
        "modaledit.cancelMultipleSelections",
    ],
    "gL": [
        "terminal-polyglot.send-block-text",
        "modaledit.cancelMultipleSelections",
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
            command: "modaledit.defineBookmark",
            args: { bookmark: "default" }
        },
    ],
    "gm": [
        {
            command: "modaledit.goToBookmark",
            args: { bookmark: "default" }
        },
    ],


    ///////////////
    // selection modiefiers
    "q=": "selection-utilities.alignSelectionsLeft",
    "q+": "selection-utilities.alignSelectionsRight",

    // selection modifiers
    "qh": "selection-utilities.activeAtStart",
    "ql": "selection-utilities.activeAtEnd",
    "qj": "selection-utilities.movePrimaryRight",
    "qk": "selection-utilities.movePrimaryLeft",
    "qc": "selection-utilities.appendToMemory",
    "qv": "selection-utilities.restoreAndClear",
    "qx": "selection-utilities.swapWithMemory",
    "qn": "selection-utilities.deleteLastSaved",
    "qd": "selection-utilities.deletePrimary",
    "qs": "selection-utilities.splitByNewline",
    "qS": "selection-utilities.splitBy",
    "qg": "selection-utilities.createBy",
    "qG": "selection-utilities.createByRegex",
    "qr": "selection-utilities.splitByRegex",
    "qf": "selection-utilities.includeBy",
    "qF": "selection-utilities.excludeBy",
    "qt": "selection-utilities.includeByRegex",
    "qT": "selection-utilities.excludeByRegex",
    "q-": {
        command: "selection-utilities.restoreAndClear",
        args: {register: "cancel"}
    },
})