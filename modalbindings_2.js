/**
 * Extend a command to support a count argument. The command is assumed to change or alter
 * selected text so that when you specify a count for that command it can be used to select
 * nearby lines. This allows noun-less verbs. e.g. 4d deletes the current line and the 4
 * lines below the current line.
 *
 * @param {string} to (optional) direction to select lines in (up / ddown), defaults to 'down',
 * @param {command} countnone The command to run when __count is not specified
 * @param {command} countN (topional) The command to run after selecting downwards or upwards
 * `__count` lines.
 * @returns combined command to handle all `__count` values and properly select the right
 * number of lines.
 */
function countSelectsLines(to, countnone, countN){
    if(!countnone){
        countnone = to
        to = 'down'
    }
    return {
        if: "!__count",
        then: countnone,
        else: [
            "modalkeys.cancelMultipleSelections",
            "modalkeys.enableSelection",
            { "cursorMove": { to: to, by: 'wrappedLine', select: true, value: '__count' } },
            "expandLineSelection",
            countN || countnone
        ]
    }
}

module.exports = {keybindings: {
    /////////////
    // motions

    // basic movement
    "::using::cursorMove::": {
        h: { to: 'left', select: "__mode !== 'normal'", value: '__count' },
        j: { to: 'down', by: 'wrappedLine', select: "__mode !== 'normal'", value: '__count' },
        k: { to: 'up', by: 'wrappedLine', select: "__mode !== 'normal'" , value: '__count' },
        l: { to: 'right', select: "__mode !== 'normal'", value: '__count' },
        gj: { to: 'down', by: 'line', select: "__mode !== 'normal'", value: '__count' },
        gk: { to: 'up', by: 'line', select: "__mode !== 'normal'", value: '__count' },
    },

    // line related movements
    H: "cursorHomeSelect",
    L: { "cursorMove": { to: "wrappedLineEnd", select: true } },
    G:  "expandLineSelection",
    K: [
        "modalkeys.cancelMultipleSelections",
        { "cursorMove": { to: 'up', by: 'wrappedLine', select: true, value: '__count' } },
        "expandLineSelection",
        "selection-utilities.activeAtStart"
    ],
    J: [
        "modalkeys.cancelMultipleSelections",
        { "cursorMove": { to: 'down', by: 'wrappedLine', select: true, value: '__count' } },
        "expandLineSelection",
    ],
    gK: [
        "modalkeys.cancelMultipleSelections",
        { "cursorMove": { to: 'up', by: 'line', select: true, value: '__count' } },
        "expandLineSelection",
        "selection-utilities.activeAtStart"
    ],
    gJ: [
        "modalkeys.cancelMultipleSelections",
        { "cursorMove": { to: 'down', by: 'line', select: true, value: '__count' } },
        "expandLineSelection",
    ],


    "\\": [
        "modalkeys.cancelMultipleSelections",
        { "cursorMove": { to: 'right', select: true, value: '__count' } }
    ],

    // movements around regex units
    "::using::selection-utilities.moveBy": {
        // word-like
        w:     { unit: "subword", boundary: "start", select:      true, value:  '(__count || 1)' },
        uw:    { unit: "subword", boundary: "start", selectWhole: true, value:  '(__count || 1)' },
        ue:    { unit: "subword", boundary: "both",  selectWhole: true, value:  '(__count || 1)' },
        W:     { unit: "word",    boundary: "start", select:      true, value:  '(__count || 1)' },
        uW:    { unit: "word",    boundary: "start", selectWhole: true, value:  '(__count || 1)' },
        uE:    { unit: "word",    boundary: "both",  selectWhole: true, value:  '(__count || 1)' },
        e:     { unit: "word",    boundary: "end",   select:      true, value:  '(__count || 1)' },
        b:     { unit: "subword", boundary: "start", select:      true, value: '-(__count || 1)' },
        ub:    { unit: "subword", boundary: "start", selectWhole: true, value: '-(__count || 1)' },
        B:     { unit: "word",    boundary: "start", select:      true, value: '-(__count || 1)' },
        uB:    { unit: "word",    boundary: "start", selectWhole: true, value: '-(__count || 1)' },
        E:     { unit: "word",    boundary: "end",   select:      true, value: '-(__count || 1)' },
        uE:    { unit: "word",    boundary: "end",   selectWhole: true, value: '-(__count || 1)' },
        "'w":  { unit: "WORD",    boundary: "start", select:      true, value:  "(__count || 1)" },
        "u'w": { unit: "WORD",    boundary: "start", selectWhole: true, value:  "(__count || 1)" },
        "u'e": { unit: "WORD",    boundary: "both",  selectWhole: true, value:  "(__count || 1)" },
        "'b":  { unit: "WORD",    boundary: "start", select:      true, value: "-(__count || 1)" },
        "u'b": { unit: "WORD",    boundary: "start", selectWhole: true, value: "-(__count || 1)" },
        "u'e": { unit: "WORD",    boundary: "both",  selectWhole: true, value: "-(__count || 1)" },

        // numbers
        "@": { value: '-(__count || 1)', unit: "integer", boundary: "both", selectWhole: true } ,
        "#": { value: '(__count || 1)', unit: "integer", boundary: "both", selectWhole: true } ,

        // comments
        "';": { unit: "comment", boundary: "both", selectWhole: true, value: '(__count || 1)'},
        "':": { unit: "comment", boundary: "both", selectWhole: true, value: '-(__count || 1)'},

        // paragraphs and sections
        p:     { unit: "paragraph",  boundary: "start", select:    true, value: '(__count || 1)'  },
        P:     { unit: "paragraph",  boundary: "start", select:    true, value: '-(__count || 1)' },
        up:  { unit: "paragraph",  boundary: "start",  selectWhole: true, value: '(__count || 1)'  },
        uP:  { unit: "paragraph",  boundary: "start",  selectWhole: true, value: '-(__count || 1)' },
        "'a":  { unit: "section",    boundary: "start", select:      true, value: '(__count || 1)'  },
        "'A":  { unit: "section",    boundary: "start", select:      true, value: '-(__count || 1)' },
        "'s":  { unit: "subsection", boundary: "start", select:      true, value: '(__count || 1)'  },
        "'S":  { unit: "subsection", boundary: "start", select:      true, value: '-(__count || 1)' },
        "u'a": { unit: "section",    boundary: "start", selectWhole: true, value: '(__count || 1)'  },
        "u'A": { unit: "section",    boundary: "start", selectWhole: true, value: '-(__count || 1)' },
        "u's": { unit: "subsection", boundary: "start", selectWhole: true, value: '(__count || 1)'  },
        "u'S": { unit: "subsection", boundary: "start", selectWhole: true, value: '-(__count || 1)' },
        "q'a": { unit: "section",    boundary: "both",  selectWhole: true, value: '(__count || 1)'  },
        "q'A": { unit: "section",    boundary: "both",  selectWhole: true, value: '-(__count || 1)' },
        "q's": { unit: "subsection", boundary: "both",  selectWhole: true, value: '(__count || 1)'  },
        "q'S": { unit: "subsection", boundary: "both",  selectWhole: true, value: '-(__count || 1)' },
    },

    // jupyter based cell selection
    "'yc": ["jupyter.gotoNextCellInFile", "jupyter.selectCell"],
    "'yC": ["jupyter.gotoPrevCellInFile", "jupyter.selectCell"],
    uy: "jupyter.selectCell",

    // function arguments
    "::using::move-cursor-by-argument.move-by-argument": {
        ",w":  { value: "(__count || 1)",  boundary: "end", select:      true },
        ",b":  { value: "-(__count || 1)", boundary: "start", select:      true },
        ",W":  { value: "(__count || 1)",  boundary: "start", select:      true },
        ",B":  { value: "-(__count || 1)", boundary: "end",   select:      true },
        // "u,w": { value: "(__count || 1)",  boundary: "both", selectWhole: true },
        // "u,b": { value: "-(__count || 1)", boundary: "both", selectWhole: true },
        // "u,W": { value: "(__count || 1)",  boundary: "start", selectWhole: true },
        // "u,B": { value: "-(__count || 1)", boundary: "end",   selectWhole: true },
        "u.": { value: "(__count || 1)",  boundary: "both", selectWhole: true },
        "u,": { value: "-(__count || 1)", boundary: "both", selectWhole: true },
        "u>": { value: "(__count || 1)",  boundary: "start", selectWhole: true },
        "u<": { value: "-(__count || 1)", boundary: "end",   selectWhole: true },
    },

    // generic, magic selection
    "uu": "editor.action.smartSelect.expand",

    // buffer related
    $: [ "editor.action.selectAll" ],
    "'G": "cursorBottomSelect",
    "'gg": "cursorTopSelect",

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

    n: { "editor.action.nextMatchFindAction": {}, repeat: "__count" },
    N: { "editor.action.previousMatchFindAction": {}, repeat: "__count" },
    ";": { "modalkeys.nextMatch": {}, repeat: "__count" },
    ",,": { "modalkeys.previousMatch": {}, repeat: "__count" },

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
        offset: 'start',
        wrapAround: true
    }},
    T: { "modalkeys.search": {
        caseSensitive: true,
        acceptAfter: 1,
        backwards: true,
        selectTillMatch: true,
        offset: 'end',
        wrapAround: true
    }},
    s: { "modalkeys.search": {
        caseSensitive: true,
        acceptAfter: 2,
        backwards: false,
        selectTillMatch: true,
        offset: 'start',
        wrapAround: true
    }},
    S: { "modalkeys.search": {
        casSensitive: true,
        acceptAfter: 2,
        backwards: true,
        selectTillMatch: true,
        offset: 'start',
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
            if: "!__selection.isEmpty",
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
            if: "!__selection.isEmpty",
            then: [
                "selection-utilities.activeAtStart",
                { "cursorMove": { "to": "left", "select": true } },
                "selection-utilities.activeAtEnd",
                { "cursorMove": { "to": "right", "select": true } }
            ],
        },
        { "editor.action.selectToBracket": {"selectBrackets": true} }
    ],

    "'>": "extension.selectAngleBrackets",
    "'<": "extension.selectInTag",

    "']": "vscode-select-by-indent.select-outer-top-only",
    "]": "vscode-select-by-indent.select-inner",
    "}": "vscode-select-by-indent.select-outer",

    "u[": { "modalkeys.selectBetween": {
        from: "[", to: "]",
        inclusive: false,
        caseSensitive: true,
        docScope: true
    }},
    
    "u(": { "modalkeys.selectBetween": {
        from: "(", to: ")",
        inclusive: false,
        caseSensitive: true,
        docScope: true
    }},
    
    "u{": { "modalkeys.selectBetween": {
        from: "{", to: "}",
        inclusive: false,
        caseSensitive: true,
        docScope: true
    }},

    "u]": { "modalkeys.selectBetween": {
        from: "[", to: "]",
        inclusive: true,
        caseSensitive: true,
        docScope: true
    }},
    
    "u)": { "modalkeys.selectBetween": {
        from: "(", to: ")",
        inclusive: true,
        caseSensitive: true,
        docScope: true
    }},
    
    "u}": { "modalkeys.selectBetween": {
        from: "{", to: "}",
        inclusive: true,
        caseSensitive: true,
        docScope: true
    }},

    uc: { "modalkeys.captureChar": {
        acceptAfter: 1,
        executeAfter: { "modalkeys.selectBetween": {
            from: "__captured",
            to: "__captured",
            inclusive: false,
            caseSensitive: true,
            docScope: true
        }},
    }},

    uv: { "modalkeys.captureChar": {
        acceptAfter: 1,
        executeAfter: { "modalkeys.selectBetween": {
            from: "__captured",
            to: "__captured",
            inclusive: true,
            caseSensitive: true,
            docScope: true
        }},
    }},

    ////////////////////////
    // selection modifiers

    R: [ "expandLineSelection", "selection-utilities.trimSelectionWhitespace" ],
    "visual::R":  "selection-utilities.trimSelectionWhitespace" ,
    U: { "selection-utilities.narrowTo": { unit: "subident", boundary: "both", } },

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
    c: countSelectsLines('down', {
        if: "!__selection.isSingleLine && __selection.end.character == 0 && __selection.start.character == 0",
        // multi-line selection
        then: [
            "deleteRight",
            "editor.action.insertLineBefore",
            "modalkeys.enterInsert"
        ],
        // single line selection
        else: { if: "!__selection.isEmpty", then: [
            "deleteRight",
            "modalkeys.enterInsert"
        ],
        // nothing selectioned
        else: [
            "expandLineSelection",
            "deleteRight",
            "editor.action.insertLineBefore",
            "modalkeys.enterInsert"
        ]}
    }, [
        "deleteRight",
        "editor.action.insertLineBefore",
        "modalkeys.enterInsert"
    ]),

    C: countSelectsLines('up', [
        "modalkeys.cancelMultipleSelections",
        "deleteAllRight",
        "modalkeys.enterInsert",
    ],
    [
        "deleteRight",
        "editor.actions.insertLineBefore",
        "modalkeys.enterInsert"
    ]),

    "gy": countSelectsLines('down', "editor.action.joinLines"),

    "`c": "extension.changeCase.camel",
    "`U": "extension.changeCase.constant",
    "`.": "extension.changeCase.dot",
    "`-": "extension.changeCase.kebab",
    "`L": "extension.changeCase.lower",
    "`l": "extension.changeCase.lowerFirst",
    "` ": "extension.changeCase.no",
    "`C": "extension.changeCase.pascal",
    "`/": "extension.changeCase.path",
    "`_": "extension.changeCase.snake",
    "`s": "extension.changeCase.swap",
    "`t": "extension.changeCase.title",
    "`Y": "extension.changeCase.upper",
    "`u": "extension.changeCase.upperFirst",
    "``": "extension.toggleCase",

    // update numerical selection
    "=": [
        {
            if: "__selections.length === 1",
            then: "editor.emmet.action.incrementNumberByOne",
            else: "extension.incrementSelection",
        },
    ],
    "+": [
        {
            if: "__selections.length === 1",
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
    "gs'":  "bracketeer.swapQuotes",
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
    d: countSelectsLines('down', [
        "editor.action.clipboardCutAction",
        "modalkeys.enterNormal"
    ]),

    D: countSelectsLines('up', [
        "modalkeys.cancelMultipleSelections",
        { "cursorMove": { to: "wrappedLineEnd", select: true } },
        "editor.action.clipboardCutAction",
    ],
    [
        "editor.action.clipboardCutAction",
        "editor.action.enterNormal"
    ]),

    x: [
        "modalkeys.cancelMultipleSelections",
        { "cursorMove": { to: "right", select: true } },
        "editor.action.clipboardCutAction",
    ],

    X: "modalkeys.replaceChar",

    // copy to clipboard
    y: countSelectsLines('down', [
        "editor.action.clipboardCopyAction", "modalkeys.cancelMultipleSelections",
    ]),

    // copy line to clipboard
    Y: countSelectsLines('up', [
        { "cursorMove": { to: "wrappedLineEnd", select: true } },
        "editor.action.clipboardCopyAction",
        "modalkeys.cancelMultipleSelections"
    ], [
        "editor.action.clipboardCopyAction",
        "modalkeys.cancelMultipleSelections"
    ]),

    // paste after
    v: [
        {
            if: "!__selection.isEmpty",
            then: [
                "selection-utilities.activeAtEnd",
                "modalkeys.cancelMultipleSelections",
            ],
            else: [
                "modalkeys.cancelMultipleSelections",
                "cursorRight",
            ],
        },
        "editor.action.clipboardPasteAction",
    ],

    // paste before
    V: [
        {
            if: "!__selection.isEmpty",
            then: [
                "selection-utilities.activeAtStart",
                "modalkeys.cancelMultipleSelections",
            ],
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
        "selection-utilities.activeAtEnd",
        "modalkeys.cancelMultipleSelections",
        "editor.action.clipboardPasteAction",
    ],

    // paste lines above
    ",V": [
        "expandLineSelection",
        "selection-utilities.activeAtStart",
        "modalkeys.cancelMultipleSelections",
        "editor.action.clipboardPasteAction",
    ],


    // begin line below
    o: ["editor.action.insertLineAfter", "modalkeys.enterInsert"],
    go: "editor.action.insertLineAfter",
    "visual::o": "selection-utilities.activeAtEnd",
    O: [ "editor.action.insertLineBefore", "modalkeys.enterInsert" ],
    gO: "editor.action.insertLineBefore",
    "visual::O": "selection-utilities.activeAtStart",

    // line indent
    ">": countSelectsLines('down', "editor.action.indentLines", ["editor.action.indentLines", "modalkeys.cancelMultipleSelections"]),
    "<": countSelectsLines('down', "editor.action.outdentLines", ["editor.action.outdentLines", "modalkeys.cancelMultipleSelections"]),

    ",f": "workbench.action.quickOpen",
    ",r": "workbench.action.openRecent",
    ":": "workbench.action.showCommands",
    ",g": "workbench.action.gotoLine",

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
    "g;":  countSelectsLines('down', [
        "editor.action.commentLine", "modalkeys.cancelMultipleSelections",
    ]),
    "g:":  countSelectsLines('down', [
        "editor.action.blockComment", "modalkeys.cancelMultipleSelections",
    ]),
    "gq": "rewrap.rewrapComment",

    /////////////
    // terminal actions
    m: countSelectsLines('down', [
        {
            if: "__language == 'julia'",
            then: "language-julia.executeCodeBlockOrSelection",
            else: {
                if: "!__selection.isSingleLine",
                then: "terminal-polyglot.send-block-text",
                else: "terminal-polyglot.send-text"
            },
        },
        "modalkeys.cancelMultipleSelections",
        "modalkeys.touchDocument"
    ]),
    M: countSelectsLines('down', [
        {
            if: "!__selection.isSingleLine",
            then: "terminal-polyglot.send-block-text",
            else: "terminal-polyglot.send-text"
        },
        "modalkeys.cancelMultipleSelections",
        "modalkeys.touchDocument"
    ]),
    gm: countSelectsLines('down', [
        "terminal-polyglot.send-text",
        "modalkeys.cancelMultipleSelections",
        "modalkeys.touchDocument"
    ]),

    ///////////////////
    // git/version control
    gr: countSelectsLines([ "git.stageSelectedRanges", "modalkeys.touchDocument", "modalkeys.cancelMultipleSelections" ]),
    gR: countSelectsLines([ "git.unstageSelectedRanges", "modalkeys.touchDocument", "modalkeys.cancelMultipleSelections" ]),
    gu: countSelectsLines(["git.revertSelectedRanges", "modalkeys.cancelMultipleSelections"]),
    gl: "git.pull",
    gp: "git.push",
    "'e": "editor.action.marker.next",
    "'E": "editor.action.marker.prev",
    "'d": "editor.action.dirtydiff.next",
    "'D": "editor.action.dirtydiff.previous",
    "'f": "workbench.action.editor.nextChange",
    "'F": "workbench.action.editor.previousChange",

    /////////////
    // window manipulation
    "'gc": { "revealLine": { lineNumber: '__line', at: 'center' } },
    "'gt": { "revealLine": { lineNumber: '__line', at: 'top' } },
    "'gb": { "revealLine": { lineNumber: '__line', at: 'bottom' } },
    "'gm": "workbench.action.minimizeOtherEditors",
    "'g=": "workbench.action.evenEditorWidths",
    gh: "editor.action.showHover",
    gf: "extension.openFileFromPath",
    gg: "editor.action.revealDefinition",
    gG: "editor.action.revealDefinitionAside",

    /////////
    // debugging
    gH: "editor.debug.action.showDebugHover",
    gb: "editor.debug.action.toggleBreakpoint",
    gdb: "editor.debug.action.conditionalBreakpoint",
    gdr: "workbench.action.debug.start",
    gdc: "workbench.action.debug.continue",
    gds: "workbench.action.debug.stepOver",
    gdi: "workbench.action.debug.stepInto",
    gdo: "workbench.action.debug.stepOut",

    //////////
    // bookmarks
    "g ": "vsc-labeled-bookmarks.toggleBookmark",
    "normal::'j": "vsc-labeled-bookmarks.navigateToNextBookmark",
    "normal::'k": "vsc-labeled-bookmarks.navigateToPreviousBookmark",
    "visual::'j": "vsc-labeled-bookmarks.expandSelectionToNextBookmark",
    "visual::'k": ["vsc-labeled-bookmarks.expandSelectionToPreviousBookmark", "selection-utilities.activeAtStart"],
    "gd ": "vsc-labeled-bookmarks.deleteBookmark",
    "'#": "vsc-labeled-bookmarks.navigateToBookmark",

    ///////////////
    // selection modifiers
    '"': [
        { if: "__selections.length <= 1",
            then: { "selection-utilities.addNext": {}, repeat: '__count' } },
        { "modalkeys.enterMode": { mode: "selectedit" } },
    ],
    ",\"": { "modalkeys.enterMode": { mode: "selectedit" } },
    "selectedit:: ": [ "selection-utilities.cancelSelection", { "modalkeys.enterMode": { mode: "normal" }} ],
    "selectedit::\n": [ { "modalkeys.enterMode": { mode: "normal" }} ],

    "selectedit::\"": { "selection-utilities.addNext": {}, repeat: '__count' },
    "selectedit::J": { "selection-utilities.addNext": {}, repeat: '__count' },
    "selectedit::K": { "selection-utilities.addPrev": {}, repeat: '__count' },
    "selectedit::gj":  { "selection-utilities.skipNext": {}, repeat: '__count' },
    "selectedit::gk": { "selection-utilities.skipPrev": {}, repeat: '__count' },


    "selectedit::=": "selection-utilities.alignSelectionsLeft",
    "selectedit::+": "selection-utilities.alignSelectionsRight",
    "'c": [
        { "selection-utilities.appendToMemory": { register: "__count" } },
        "modalkeys.cancelMultipleSelections", "modalkeys.enterNormal"
    ],
    "'v": [
        { "selection-utilities.restoreAndClear": { register: "__count" } },
        { if: "__selections.length > 1", then: { "modalkeys.enterMode": { mode: "selectedit" }}}
    ],

    "'x": { "selection-utilities.swapWithMemory": { register: "__count" } },
    "'n": { "selection-utilities.deleteLastSaved": { register: "__count" } },
    "'\n": countSelectsLines([
        "selection-utilities.splitByNewline",
        { "modalkeys.enterMode": { mode: "selectedit" } }
    ]),
    "'*": [
        "editor.action.selectHighlights",
        { "modalkeys.enterMode": { mode: "selectedit" } },
    ],
    "'-": [
        { "selection-utilities.restoreAndClear": {register: "cancel"} },
        { if: "__selections.length > 1", then: { "modalkeys.enterMode": { mode: "selectedit" }}}
    ],

    "selectedit::r": [ "modalkeys.enterNormal", "modalkeys.cancelMultipleSelections" ],
    "selectedit::O": "selection-utilities.activeAtStart",
    "selectedit::o": "selection-utilities.activeAtEnd",
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

    ////////
    // symmetric insertion (around selection)
    ui: { "modalkeys.enterMode": { mode: "syminsert" } },
    "syminsert::\n": { "modalkeys.enterMode": { mode: "normal" } },
    "syminsert::i": { "modalkeys.captureChar": {
        acceptAfter: 1,
        executeAfter: { "selection-utilities.insertAround": {
            before: "__captured",
            after: "__captured",
        }}
    }},
    "syminsert::r": [ "modalkeys.enterNormal", "modalkeys.cancelMultipleSelections" ],
    ...(Object.fromEntries(Array.from(":;'\",./?|\\=+-_*&^%$#@!`~").map(c =>
        ["syminsert::"+c, { "selection-utilities.insertAround": { before: c, after: c }}]
    ))),
    "syminsert::o": "selection-utilities.activeAtEnd",
    "syminsert::O": "selection-utilities.activeAtStart",
    "syminsert::x": { "selection-utilities.deleteAround": { count: "__count" }},
    "syminsert::d": { "selection-utilities.deleteAround": { count: "__count" }},
    "syminsert::l": {
        "if": "!__selection.isReversed",
        "then": { "selection-utilities.adjustSelections": 
            { dir: "forward", count: "__count" }
        },
        "else": { "selection-utilities.adjustSelections": 
            { dir: "backward", count: "__count" }
        },
    },
    "syminsert::h": {
        "if": "!__selection.isReversed",
        "then": { "selection-utilities.adjustSelections": 
            { dir: "backward", count: "__count" }
        },
        "else": { "selection-utilities.adjustSelections": 
            { dir: "forward", count: "__count" }
        },
    },
    "syminsert::{": { "selection-utilities.insertAround": { before: "{", after: "}" }},
    "syminsert::[": { "selection-utilities.insertAround": { before: "[", after: "]" }},
    "syminsert::(": { "selection-utilities.insertAround": { before: "(", after: ")" }},
    "syminsert::<": { "selection-utilities.insertAround": { before: "<", after: ">" }},
}}