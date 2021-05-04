module.exports = {keybindings: {
    /////////////
    // motions

    // basic movement
    "::using::cursorMove::": {
        h: { to: 'left', select: "__mode == 'visual'", value: '__count' },
        j: { to: 'down', by: 'wrappedLine', select: "__mode == 'visual'", value: '__count' },
        k: { to: 'up', by: 'wrappedLine', select: "__mode == 'visual'" , value: '__count' },
        l: { to: 'right', select: "__mode == 'visual'", value: '__count' },
        gj: { to: 'down', by: 'line', select: "__mode == 'visual'", value: '__count' },
        gk: { to: 'up', by: 'line', select: "__mode == 'visual'", value: '__count' },
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

    // movements around regex units
    "::using::selection-utilities.moveBy": {
        // word-like
        w:   { unit: "subword", boundary: "start", select:      true, value:  '__count' } ,
        uw:  { unit: "subword", boundary: "start", selectWhole: true, value:  '__count' } ,
        W:   { unit: "word",    boundary: "start", select:      true, value:  '__count' } ,
        uW:  { unit: "word",    boundary: "start", selectWhole: true, value:  '__count' } ,
        e:   { unit: "word",    boundary: "end",   select:      true, value:  '__count' } ,
        ue:  { unit: "word",    boundary: "end",   selectWhole: true, value:  '__count' } ,
        b:   { unit: "subword", boundary: "start", select:      true, value: '-__count' } ,
        ub:  { unit: "subword", boundary: "start", selectWhole: true, value: '-__count' } ,
        B:   { unit: "word",    boundary: "start", select:      true, value: '-__count' } ,
        uB:  { unit: "word",    boundary: "start", selectWhole: true, value: '-__count' } ,
        E:   { unit: "word",    boundary: "end",   select:      true, value: '-__count' } ,
        uE:  { unit: "word",    boundary: "end",   selectWhole: true, value: '-__count' } ,
        gw:  { unit: "WORD",    boundary: "start", select:      true, value:  "__count" },
        ugw: { unit: "WORD",    boundary: "start", selectWhole: true, value:  "__count" },
        gb:  { unit: "WORD",    boundary: "start", select:      true, value: "-__count" },
        ugb: { unit: "WORD",    boundary: "start", selectWhole: true, value: "-__count" },
        gW:  { unit: "WORD",    boundary: "end",   select:      true, value:  "__count" },
        ugW: { unit: "WORD",    boundary: "end",   selectWhole: true, value:  "__count" },
        gB:  { unit: "WORD",    boundary: "end",   select:      true, value: "-__count" },
        ugB: { unit: "WORD",    boundary: "end",   selectWhole: true, value: "-__count" },

        // numbers
        "@": { value: '-__count', unit: "integer", boundary: "both", selectWhole: true } ,
        "#": { value: '__count', unit: "integer", boundary: "both", selectWhole: true } ,

        // comments
        "';": { unit: "comment", boundary: "both", selectWhole: true, value: '__count'},
        "':": { unit: "comment", boundary: "both", selectWhole: true, value: '-__count'},

        // paragraphs and sections
        p:     { unit: "paragraph",  boundary: "start", select:    true, value: '__count'  },
        P:     { unit: "paragraph",  boundary: "start", select:    true, value: '-__count' },
        up:  { unit: "paragraph",  boundary: "start",  selectWhole: true, value: '__count'  },
        uP:  { unit: "paragraph",  boundary: "start",  selectWhole: true, value: '-__count' },
        "'a":  { unit: "section",    boundary: "start", select:      true, value: '__count'  },
        "'A":  { unit: "section",    boundary: "start", select:      true, value: '-__count' },
        "'s":  { unit: "subsection", boundary: "start", select:      true, value: '__count'  },
        "'S":  { unit: "subsection", boundary: "start", select:      true, value: '-__count' },
        "u'a": { unit: "subsection", boundary: "start", selectWhole: true, value: '__count'  },
        "u'A": { unit: "subsection", boundary: "start", selectWhole: true, value: '-__count' },
        "u's": { unit: "section",    boundary: "start", selectWhole: true, value: '__count'  },
        "u'S": { unit: "section",    boundary: "start", selectWhole: true, value: '-__count' },
    },

    // function arguments
    "::using::move-cursor-by-argument.move-by-argument": {
        "'w":  { value: "__count",  boundary: "both", select:      true },
        "'b":  { value: "-__count", boundary: "both", select:      true },
        "'W":  { value: "__count",  boundary: "start", select:      true },
        "'B":  { value: "-__count", boundary: "end",   select:      true },
        "u'w": { value: "__count",  boundary: "both", selectWhole: true },
        "u'b": { value: "-__count", boundary: "both", selectWhole: true },
        "u'W": { value: "__count",  boundary: "start", selectWhole: true },
        "u'B": { value: "-__count", boundary: "end",   selectWhole: true },
    },

    // buffer related
    $: [ "editor.action.selectAll" ],
    "'j": "cursorBottomSelect",
    "'k": "cursorTopSelect",

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
    ",,": "modalkeys.previousMatch",

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
    "''": "bracketeer.selectQuotesContent",
    "'\"": ["bracketeer.selectQuotesContent", "bracketeer.selectQuotesContent"],
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
    c: {
        if: "__count == 1",
        then: {
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
        else: [{ "modalkeys.typeKeys": { keys: "`r ${__count}jGc`" } }, "modalkeys.enterInsert"]
    },

    C: {
        if: "__count == 1",
        then: [
            "modalkeys.cancelMultipleSelections",
            "deleteAllRight",
            "modalkeys.enterInsert",
        ],
        else: [{ "modalkeys.typeKeys": { keys: "`r ${__count}kGc`" } }, "modalkeys.enterInsert"]
    },

    "gy": "editor.action.joinLines",

    "~": "editor.action.transformToUppercase",
    "`": "editor.action.transformToLowercase",

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
    "gd[":  "bracketeer.removeBrackets",
    "gs[":  "bracketeer.swapBrackets",
    "gs\"":  "bracketeer.swapQuotes",
    "gd'":  "bracketeer.removeQuotes",
    "gi(": [ "modalkeys.enterInsert", { "type": { text: "(" }, }, "modalkeys.enterNormal" ],
    "gi<": [ "modalkeys.enterInsert", { "type": { text: "<" }, }, "modalkeys.enterNormal" ],
    "gi`": [ "modalkeys.enterInsert", { "type": { text: "`" }, }, "modalkeys.enterNormal" ],
    "gi\"": [ "modalkeys.enterInsert", { "type": { "text": "\"" }, }, "modalkeys.enterNormal" ],
    "gi'": [ "modalkeys.enterInsert", { "type": { text: "'" }, }, "modalkeys.enterNormal" ],
    "gi*": [ "modalkeys.enterInsert", { "type": { text: "*" }, }, "modalkeys.enterNormal" ],
    // "'i2*": [ "modalkeys.enterInsert", { "type": { text: "**" }, }, "modalkeys.enterNormal" ],
    "gi{": [ "modalkeys.enterInsert", { "type": { text: "{" }, }, "modalkeys.enterNormal" ],
    "gi[": [ "modalkeys.enterInsert", { "type": { text: "[" }, }, "modalkeys.enterNormal" ],

    /////////////
    // clipboard actions

    // cut to clipboard
    d: {
        if: "__count == 1",
        then: "editor.action.clipboardCutAction",
        else: [
            { "modalkeys.typeKeys": { keys: "`r ${__count}jG`" } },
            "editor.action.clipboardCutAction",
        ]
    },

    D: {
        if: "__count == 1",
        then: [
            "modalkeys.cancelMultipleSelections",
            { "cursorMove": { to: "wrappedLineEnd", select: true } },
            "editor.action.clipboardCutAction",
        ],
        else: [
            { "modalkeys.typeKeys": { keys: "`r ${__count}kG`" } },
            "editor.action.clipboardCutAction",
        ]
    },

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
    y: [ "editor.action.clipboardCopyAction", "modalkeys.cancelMultipleSelections", ],

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
    ",v": [
        "expandLineSelection",
        { if: "!editor.selection.isEmpty",
            then: { "cursorMove": { to: "right", select: false, value: 0 } },
            else: "cursorRight"
        },
        "editor.action.clipboardPasteAction",
    ],

    // paste lines above
    ",V": [
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
    "visual::o": "selection-utilities.activeAtEnd",
    O: [ "editor.action.insertLineBefore", "modalkeys.enterInsert" ],
    "visual::O": "selection-utilities.activeAtStart",

    // line indent
    ">": "editor.action.indentLines",
    "<": "editor.action.outdentLines",

    ":": "workbench.action.quickOpen",

    ///////////////////////
    // history

    z: [ "undo", "modalkeys.cancelMultipleSelections", "modalkeys.untouchDocument", ],
    Z: [ "redo", "modalkeys.cancelMultipleSelections", "modalkeys.untouchDocument", ],
    "-": "cursorUndo",
    "_": "cursorRedo",

    ".": [
        "modalkeys.repeatLastUsedSelection",
        "modalkeys.repeatLastChange",
    ],
    "'.": "modalkeys.repeatLastUsedSelection",
    "g.": "modalkeys.repeatLastChange",

    /////////////
    // comment actions
    "g;": [ "editor.action.commentLine", "modalkeys.cancelMultipleSelections", ],
    "g:": [ "editor.action.blockComment", "modalkeys.cancelMultipleSelections", ],
    "gq": "rewrap.rewrapComment",

    /////////////
    // terminal actions
    m: {
        if: "__selection.match('\\n')",
        then: [ "terminal-polyglot.send-block-text", "modalkeys.cancelMultipleSelections", "modalkeys.touchDocument" ],
        else: [ "terminal-polyglot.send-text", "modalkeys.cancelMultipleSelections", "modalkeys.touchDocument" ],
    },
    gm: [
        "terminal-polyglot.send-text",
        "modalkeys.cancelMultipleSelections",
    ],

    ///////////////////
    // git/version control
    gr: [ "git.stageSelectedRanges", "modalkeys.touchDocument" ],
    gR: [ "git.unstageSelectedRanges", "modalkeys.touchDocument" ],
    gu: "git.revertSelectedRanges",
    "'e": "editor.action.marker.next",
    "'E": "editor.action.marker.prev",
    "'d": "editor.action.dirtydiff.next",
    "'D": "editor.action.dirtydiff.previous",
    "'f": "workbench.action.editor.nextChange",
    "'F": "workbench.action.editor.previousChange",

    /////////////
    // window manipulation
    "'zc": { "revealLine": { lineNumber: '__line', at: 'center' } },
    "'zt": { "revealLine": { lineNumber: '__line', at: 'top' } },
    "'zb": { "revealLine": { lineNumber: '__line', at: 'bottom' } },
    gh: "editor.action.showHover",
    gH: "editor.debug.action.showDebugHover",
    gg: "editor.action.revealDefinition",
    gG: "editor.action.revealDefinitionAside",

    //////////
    // bookmarks
    "g ": { "modalkeys.defineBookmark": { bookmark: "default", bookmark: '__count' } },
    gJ: { "modalkeys.goToBookmark": { bookmark: "default", bookmark: '__count' } },
    "gd ": { "modalkeys.clearBookmark": { bookmark: "default", bookmark: '__count' } },

    ///////////////
    // selection modifiers
    "\"": { "modalkeys.enterMode": { mode: "selectedit" } },
    "selectedit::\"": { "modalkeys.enterMode": { mode: "normal" } },
    "selectedit::\n": { "modalkeys.enterMode": { mode: "normal" } },

    "selectedit::=": "selection-utilities.alignSelectionsLeft",
    "selectedit::+": "selection-utilities.alignSelectionsRight",
    "'c": "selection-utilities.appendToMemory",
    "'v": "selection-utilities.restoreAndClear",
    "'x": "selection-utilities.swapWithMemory",
    "'n": "selection-utilities.deleteLastSaved",
    "'\n": "selection-utilities.splitByNewline",
    "'-": { "selection-utilities.restoreAndClear": {register: "cancel"} },

    "selectedit::r": [ "modalkeys.enterNormal", "modalkeys.cancelMultipleSelections" ],
    "selectedit::h": "selection-utilities.activeAtStart",
    "selectedit::l": "selection-utilities.activeAtEnd",
    "selectedit::j": { "selection-utilities.movePrimaryRight": {}, repeat: '__count' },
    "selectedit::k": { "selection-utilities.movePrimaryLeft": {}, repeat: '__count' },
    "selectedit::d": { "selection-utilities.deletePrimary": {}, repeat: '__count' },
    "selectedit::s\n": "selection-utilities.splitByNewline",
    "selectedit::sc": "selection-utilities.splitBy",
    "selectedit::cc": "selection-utilities.createBy",
    "selectedit::cr": "selection-utilities.createByRegex",
    "selectedit::sr": "selection-utilities.splitByRegex",
    "selectedit::ic": "selection-utilities.includeBy",
    "selectedit::ec": "selection-utilities.excludeBy",
    "selectedit::ir": "selection-utilities.includeByRegex",
    "selectedit::er": "selection-utilities.excludeByRegex",
}}