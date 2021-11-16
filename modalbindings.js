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
    "::doc::h": { kind: "select", label: "←", detail: "move left" },
    "::doc::j": { kind: "select", label: '↓', detail: "move down" },
    "::doc::k": { kind: "select", label: '↑', detail: "move up" },
    "::doc::l": { kind: "select", label: '→', detail: "move right" },
    "::doc::g": { kind: "leader", label: "actions", detail: "additional commands (mostly actions)" },
    "::doc::gj": { kind: "select", label: 'unwrp ↓', detail: "Down unwrapped line" },
    "::doc::gk": { kind: "select", label: 'unwrp ↑', detail: "Up unwrapped line"},
    "::using::cursorMove::": {
        h: { to: 'left', select: "__mode !== 'normal'", value: '__count' },
        j: { to: 'down', by: 'wrappedLine', select: "__mode !== 'normal'", value: '__count' },
        k: { to: 'up', by: 'wrappedLine', select: "__mode !== 'normal'" , value: '__count' },
        l: { to: 'right', select: "__mode !== 'normal'", value: '__count' },
        gj: { to: 'down', by: 'line', select: "__mode !== 'normal'", value: '__count' },
        gk: { to: 'up', by: 'line', select: "__mode !== 'normal'", value: '__count' },
    },

    // line related movements
    "::doc::H": { kind: "select", label: "start", detail: "start of line (alterantes between first non-whitepace, and first)" },
    H: "cursorHomeSelect",
    "::doc::L": { kind: "select", label: "end", detail: "end of line" },
    L: { "cursorMove": { to: "wrappedLineEnd", select: true } },
    "::doc::G": { kind: "select", label: "entire line", detail: "expand selection to entire line" },
    G:  "expandLineSelection",
    "::doc::K": { kind: "select", label: "sel ↑", detail: "select lines upwards" },    
    K: [
        "modalkeys.cancelMultipleSelections",
        { "cursorMove": { to: 'up', by: 'wrappedLine', select: true, value: '__count' } },
        "expandLineSelection",
        "selection-utilities.activeAtStart"
    ],
    "::doc::J": { kind: "select", label: "sel ↓", detail: "select lines downwards" },    
    J: [
        "modalkeys.cancelMultipleSelections",
        { "cursorMove": { to: 'down', by: 'wrappedLine', select: true, value: '__count' } },
        "expandLineSelection",
    ],
    "::doc::gK": { kind: "select", label: 'unwrp sel ↑', detail: "select unwrapped lines upwards" },
    gK: [
        "modalkeys.cancelMultipleSelections",
        { "cursorMove": { to: 'up', by: 'line', select: true, value: '__count' } },
        "expandLineSelection",
        "selection-utilities.activeAtStart"
    ],
    "::doc::gJ": { kind: "select", label: 'unwrp sel ↓', detail: "select unwrapped lines downwards" },
    gJ: [
        "modalkeys.cancelMultipleSelections",
        { "cursorMove": { to: 'down', by: 'line', select: true, value: '__count' } },
        "expandLineSelection",
    ],


    "::doc::\\": { kind: "select", label: 'right character', detail: "select *just* the character to the right" },
    "\\": [
        "modalkeys.cancelMultipleSelections",
        { "cursorMove": { to: 'right', select: true, value: '__count' } }
    ],
    "::doc::\\": { kind: "select", label: 'left character', detail: "select *just* the character to the left" },
    "|": [
        "modalkeys.cancelMultipleSelections",
        { "cursorMove": { to: 'left', select: true, value: '__count' } }
    ],

    // movements around regex units
    "::doc::'": { kind: "leader", label: "selections", detail: "additional commands (mostly selection/view related)"},
    "::doc::u": { kind: "modifier", label: "around", detail: "next selection command will move start of selection to surround the entire object (rather than extending to specified start/end point)" },
    "::doc::w": { kind: "select", label: "subwrd →", detail: "next subword (camel/snake case)" },
    "::doc::W": { kind: "select", label: "word →", detail: "next word"},
    "::doc::e": { kind: "select", label: "word end →", detail: "next word end" },
    "::doc::b": { kind: "select", label: "subwrd ←", detail: "previous subword (came/snake case)" },
    "::doc::B": { kind: "select", label: "word ←", detail: "previous word" },
    "::doc::E": { kind: "select", label: "word end ←", detail: "previous word end" },
    "::doc::@": { kind: "select", label: "number →", detail: "next number" },
    "::doc::#": { kind: "select", label: "number →", detail: "previous number" },
    "::doc::';": { kind: "select", label: "comment →", detail: "next commented region" },
    "::doc::':": { kind: "select", label: "comment ←", detail: "previous commented region" },
    "::doc::p": { kind: "select", label: "pargrph →", detail: "next pagaraph" },
    "::doc::P": { kind: "select", label: "pargrph ←", detail: "previous paragraph" },
    "::doc::'a": { kind: "select", label: "sec →", detail: "next section" },
    "::doc::'A": { kind: "select", label: "sec ←", detail: "previous section" },
    "::doc::'s": { kind: "select", label: "subsec →", detail: "next subsection" },
    "::doc::'S": { kind: "select", label: "subsec ←", detail: "previous subsection" },

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
    },

    // jupyter based cell selection
    "::doc::'y": { kind: "select", label: "jupyter", detail: "jupyter related selection commands"},
    "::doc::'yc": { kind: "select", label: "cell →", detail: "next jupyter cell"},
    "'yc": ["jupyter.gotoNextCellInFile", "jupyter.selectCell"],
    "::doc::'yC": { kind: "select", label: "cell ←", detail: "previous jupyter cell"},
    "'yC": ["jupyter.gotoPrevCellInFile", "jupyter.selectCell"],
    "::doc::uy": { kind: "select", label: "cell", detail: "select cel"},
    uy: "jupyter.selectCell",

    // function arguments
    "::using::move-cursor-by-argument.move-by-argument": {
        "::doc::,w": { kind: "select", label: "arg →", detail: "Next function argument"},
        ",w":  { value: "(__count || 1)",  boundary: "end", select:      true },
        "::doc::,b": { kind: "select", label: "arg ←", detail: "Previous function argument"},
        ",b":  { value: "-(__count || 1)", boundary: "start", select:      true },
        "::doc::,W": { kind: "select", label: "arg(+,) →", detail: "Next function argument (and comma)"},
        ",W":  { value: "(__count || 1)",  boundary: "start", select:      true },
        "::doc::,B": { kind: "select", label: "arg(+,) ←", detail: "Previous function argument (and comma)"},
        ",B":  { value: "-(__count || 1)", boundary: "end",   select:      true },
        "::doc::u.": { kind: 'select', label: "arg →", detail: "Around next argument"},
        "u.": { value: "(__count || 1)",  boundary: "both", selectWhole: true },
        "::doc::u,": { kind: 'select', label: "arg ←", detail: "Around previous argument"},
        "u,": { value: "-(__count || 1)", boundary: "both", selectWhole: true },
        "::doc::u>": { kind: 'select', label: "arg →", detail: "Around next argument (with comma)"},
        "u>": { value: "(__count || 1)",  boundary: "start", selectWhole: true },
        "::doc::u<": { kind: 'select', label: "arg ←", detail: "Around previous argument (with comma)"},
        "u<": { value: "-(__count || 1)", boundary: "end",   selectWhole: true },
    },

    // generic, magic selection
    "::doc::uu": { kind: 'select', label: "smart expand", detail: "Use VSCode's built-in smart expansion command"},
    "uu": "editor.action.smartSelect.expand",

    // buffer related
    "::doc::$": { kind: "select", label: "everything" },
    $: [ "editor.action.selectAll" ],
    "::doc::gG": { kind: 'select', label: 'to document end'},
    "gG": "cursorBottomSelect",
    "::doc::'gg": { kind: 'select', label: 'to document start'},
    "'gg": "cursorTopSelect",

    // search related
    // "/": "actions.find",
    "::doc::": { kind: "select", label: "match →", detail: "Next match to object under cursor"},
    "*": [
        { "modalkeys.search": {
            text: "__wordstr",
            wrapAround: true,
            register: "search"
        }}
    ],
    "::doc::": { kind: "select", label: "match ←", detail: "Previous match to object under cursor"},
    "&": [
        { "modalkeys.search": {
            text: "__wordstr",
            wrapAround: true,
            backwards: true,
            register: "search"
        }}
    ],

    "::doc::": { kind: "select", label: "search →", detail: "Next match to search term"},
    "n": { "modalkeys.nextMatch": {register: "search"}, repeat: "__count" },
    "::doc::": { kind: "select", label: "search →", detail: "Previous match to search term"},
    "N": { "modalkeys.previousMatch": {register: "search"}, repeat: "__count" },

    "::doc::": { kind: "select", label: "search", detail: "Search forwards" },
    "/": { "modalkeys.search": {
        register: "search",
        caseSensitive: true,
        backwards: false,
        selectTillMatch: true,
        wrapAround: true
    } },
    "::doc::": { kind: "select", label: "search back", detail: "Search backward" },
    "?": { "modalkeys.search": {
        register: "search",
        caseSensitive: true,
        backwards: true,
        selectTillMatch: true,
        wrapAround: true
    } },

    "::doc::": { kind: "select", label: "find char", detail: "To next char (include char in selection)"},
    f: { "modalkeys.search": {
        caseSensitive: true,
        acceptAfter: 1,
        backwards: false,
        selectTillMatch: true,
        wrapAround: true
    }},
    "::doc::": { kind: "select", label: "find char back", detail: "To previous character (include char in selection)"},
    F: { "modalkeys.search": {
        caseSensitive: true,
        acceptAfter: 1,
        backwards: true,
        selectTillMatch: true,
        wrapAround: true
    }},
    "::doc::": { kind: "select", label: "find char", detail: "To next character (exclude char in selection)"},
    t: { "modalkeys.search": {
        caseSensitive: true,
        acceptAfter: 1,
        backwards: false,
        selectTillMatch: true,
        offset: 'start',
        wrapAround: true
    }},
    "::doc::": { kind: "select", label: "find char back", detail: "To previous character (exclude char in selection)"},
    T: { "modalkeys.search": {
        caseSensitive: true,
        acceptAfter: 1,
        backwards: true,
        selectTillMatch: true,
        offset: 'end',
        wrapAround: true
    }},
    "::doc::": { kind: "select", label: "find char pair", detail: "To next character pair"},
    s: { "modalkeys.search": {
        caseSensitive: true,
        acceptAfter: 2,
        backwards: false,
        selectTillMatch: true,
        offset: 'start',
        wrapAround: true
    }},
    "::doc::": { kind: "select", label: "char pair back", detail: "To previous character pair"},
    S: { "modalkeys.search": {
        casSensitive: true,
        acceptAfter: 2,
        backwards: true,
        selectTillMatch: true,
        offset: 'start',
        wrapAround: true
    }},
    ";": { "modalkeys.nextMatch": {}, repeat: "__count" },
    ",,": { "modalkeys.previousMatch": {}, repeat: "__count" },

    ////////////////////////
    // more complex syntactic selections

    // "I": "select-indentation.expand-selection",
    "::doc::%": { kind: 'select', lablel: 'to bracket', detail: "Move to matching bracket"},
    '%': "editor.action.jumpToBracket",
    "::doc::''": {kind: 'select', label: 'in quotes', detail: "text within current quotes"},
    "''": "bracketeer.selectQuotesContent",
    "::doc::'\"": {kind: 'select', label: 'around quotes', detail: "quotes and text within current quotes"},
    "'\"": ["bracketeer.selectQuotesContent", "bracketeer.selectQuotesContent"],
    // the below is a bit hacky; I want to add these commandsto my extension
    "::doc::[": {kind: 'select', label: 'in parens', detail: 'text inside parents/brackets/braces'},
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
    "::doc::[": {kind: 'select', label: 'arnd parens', detail: 'parents/brackets/braces and their contents'},
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

    "::doc::'<": { kind: 'select', label: 'in <>', detail: 'text inside angle brackets'},
    "'>": "extension.selectAngleBrackets",
    "::doc::'<": { kind: 'select', label: 'in ><', detail: 'text inside tag pairs (e.g. <a>text</a>)'},
    "'<": "extension.selectInTag",

    "::doc::']": {kind: 'select', label: 'indent and top', detail: 'all text at same indent and the unindent line just above it (ala python syntax)'},
    "']": "vscode-select-by-indent.select-outer-top-only",
    "::doc::]": {kind: 'select', label: 'indent', detail: 'all text at same indent'},
    "]": "vscode-select-by-indent.select-inner",
    "::doc::}": {kind: 'select', label: 'indent and surrounding', detail: 'all text at same indent along with the line above and below this (ala c-like synatx)'},
    "}": "vscode-select-by-indent.select-outer",

    "::doc::u[": {kind: 'select', label: 'inside []', detail: 'inside first character pair `[]` (non syntactical, useful inside comments)'},
    "u[": { "modalkeys.selectBetween": {
        from: "[", to: "]",
        inclusive: false,
        caseSensitive: true,
        docScope: true
    }},
    
    "::doc::u(": {kind: 'select', label: 'inside ()', detail: 'inside first character pair `()` (non syntactical, useful inside comments)'},
    "u(": { "modalkeys.selectBetween": {
        from: "(", to: ")",
        inclusive: false,
        caseSensitive: true,
        docScope: true
    }},
    
    "::doc::u{": {kind: 'select', label: 'inside {}', detail: 'inside first character pair `{}` (non syntactical, useful inside comments)'},
    "u{": { "modalkeys.selectBetween": {
        from: "{", to: "}",
        inclusive: false,
        caseSensitive: true,
        docScope: true
    }},

    "::doc::u[": {kind: 'select', label: 'around []', detail: 'around first character pair `[]` (non syntactical, useful inside comments)'},    "u]": { "modalkeys.selectBetween": {
        from: "[", to: "]",
        inclusive: true,
        caseSensitive: true,
        docScope: true
    }},
    
    "::doc::u(": {kind: 'select', label: 'around ()', detail: 'around first character pair `()` (non syntactical, useful inside comments)'},    
    "u)": { "modalkeys.selectBetween": {
        from: "(", to: ")",
        inclusive: true,
        caseSensitive: true,
        docScope: true
    }},
    
    "::doc::u{": {kind: 'select', label: 'around {}', detail: 'around first character pair `{}` (non syntactical, useful inside comments)'},    
    "u}": { "modalkeys.selectBetween": {
        from: "{", to: "}",
        inclusive: true,
        caseSensitive: true,
        docScope: true
    }},

    "::doc::uC": {kind: 'select', label: 'between pair (special)', detail: 'around a pair of characters (non syntactical, useful inside comments)' },  
    "::doc::uC,": {kind: 'select', label: 'inside <>', detail: 'inside first character pair `<>` (non syntactical, useful inside comments)'},    
    "uC,": { "modalkeys.selectBetween": {
        from: "<", to: ">",
        inclusive: false,
        caseSensitive: true,
        docScope: true
    }},
    "::doc::uC,": {kind: 'select', label: 'inside ><', detail: 'inside first character pair `><` (non syntactical, useful inside comments)'},    
    "uC.": { "modalkeys.selectBetween": {
        from: ">", to: "<",
        inclusive: false,
        caseSensitive: true,
        docScope: true
    }},
    "::doc::uC<": {kind: 'select', label: 'around <>', detail: 'around first character pair `<>` (non syntactical, useful inside comments)'},    
    "uC<": { "modalkeys.selectBetween": {
        from: "<", to: ">",
        inclusive: true,
        caseSensitive: true,
        docScope: true
    }},
    "::doc::uC,": {kind: 'select', label: 'around ><', detail: 'around first character pair `><` (non syntactical, useful inside comments)'},    
    "uC>": { "modalkeys.selectBetween": {
        from: ">", to: "<",
        inclusive: true,
        caseSensitive: true,
        docScope: true
    }},

    "::doc::uc": {kind: 'select', label: 'between pair', detail: 'between two instances of any character, exclusive of the pair (non syntatical, useful inside comments)'},
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

    "::doc::uv": {kind: 'select', label: 'around pair', detail: 'between two instance of any character, inclusive of the pair (non syntatical, useful inside comments)'},
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
    "~": [
        "modalkeys.cancelMultipleSelections",
        { "cursorMove": { to: 'right', select: true, value: '__count' } },
        {
            "if": "__selectionstr == __selectionstr.toUpperCase()",
            "then": "editor.action.transformToLowercase",
            "else": "editor.action.transformToUppercase"
        },
        "modalkeys.cancelMultipleSelections",
        "cursorLeft"
    ],

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
    "g=": "editor.emmet.action.incrementNumberByOne",
    "g+": "editor.emmet.action.decrementNumberByOne",

    // check
    "^": "markdown-checkbox.markCheckbox",

    "ga": "selection-utilities.trimWhitespace",

    // brackets
    "gx[":  "bracketeer.removeBrackets",
    "gs[":  "bracketeer.swapBrackets",
    "gs'":  "bracketeer.swapQuotes",
    "gx'":  "bracketeer.removeQuotes",
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
    ">": countSelectsLines('down', "editor.action.indentLines", [
        "editor.action.indentLines", 
        "modalkeys.cancelMultipleSelections"
    ]),
    "<": countSelectsLines('down', "editor.action.outdentLines", [
        "editor.action.outdentLines", 
        "modalkeys.cancelMultipleSelections"
    ]),
    "g>": countSelectsLines('down', "editor.action.formatSelection", [
        "editor.action.formatSelection",
        "modalkeys.cancelMultipleSelections"
    ]),

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

    "q": { "modalkeys.toggleRecordingMacro": { register: "__count" } },
    "Q": { "modalkeys.replayMacro": { register: "__count" } },
    "'q": "modalkeys.cancelRecordingMacro",

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
            then: "language-julia.executeCodeBlockOrSelectionAndMove",
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
    "'gg": { "revealLine": { lineNumber: '__line', at: 'center' } },
    "'gK": { "revealLine": { lineNumber: '__line', at: 'top' } },
    "'gJ": { "revealLine": { lineNumber: '__line', at: 'bottom' } },
    "'gm": "workbench.action.minimizeOtherEditors",
    "'g=": "workbench.action.evenEditorWidths",
    "'g|": "workbench.action.toggleSplitEditorInGroup",
    "'ge": "workbench.action.focusOtherSideEditor",
    "'gl": "workbench.action.focusRightGroup",
    "'gh": "workbench.action.focusLeftGroup",
    "'gk": "workbench.action.focusAboveGroup",
    "'gj": "workbench.action.focusBelowGroup",
    "'gcl": "workbench.action.splitEditorRight",
    "'gch": "workbench.action.splitEditorLeft",
    "'gcj": "workbench.action.splitEditorDown",
    "'gck": "workbench.action.splitEditorUp",
    "'gtl": "workbench.action.moveEditorToRightGroup",
    "'gth": "workbench.action.moveEditorToLeftGroup",
    "'gtj": "workbench.action.moveEditorToBelowGroup",
    "'gtk": "workbench.action.moveEditorToAboveGroup",

    gh: "editor.action.showHover",
    gf: "extension.openFileFromPath",
    gd: "editor.action.revealDefinition",
    gD: "editor.action.revealDefinitionAside",

    /////////
    // debugging
    gH: "editor.debug.action.showDebugHover",
    gb: "editor.debug.action.toggleBreakpoint",
    geb: "editor.debug.action.conditionalBreakpoint",
    ger: "workbench.action.debug.start",
    gec: "workbench.action.debug.continue",
    ges: "workbench.action.debug.stepOver",
    gei: "workbench.action.debug.stepInto",
    geo: "workbench.action.debug.stepOut",

    //////////
    // bookmarks
    "g ": "vsc-labeled-bookmarks.toggleBookmark",
    "normal::'j": "vsc-labeled-bookmarks.navigateToNextBookmark",
    "normal::'k": "vsc-labeled-bookmarks.navigateToPreviousBookmark",
    "visual::'j": "vsc-labeled-bookmarks.expandSelectionToNextBookmark",
    "visual::'k": ["vsc-labeled-bookmarks.expandSelectionToPreviousBookmark", "selection-utilities.activeAtStart"],
    "gx ": "vsc-labeled-bookmarks.deleteBookmark",
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
    "selectedit::i": [  "selection-utilities.cancelMultipleSelections", { "modalkeys.enterMode": { mode: "insert" }} ],
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
    "'K": [
        { "editor.action.insertCursorAbove": {}, repeat: '__count' },
        { "modalkeys.enterMode": { mode: "selectedit" } },
    ],
    "'J": [
        { "editor.action.insertCursorBelow": {}, repeat: '__count' },
        { "modalkeys.enterMode": { mode: "selectedit" }},
    ],

    "selectedit::r": [ "modalkeys.enterNormal", "modalkeys.cancelMultipleSelections" ],
    "selectedit::O": "selection-utilities.activeAtStart",
    "selectedit::o": "selection-utilities.activeAtEnd",
    "selectedit::j": { "selection-utilities.movePrimaryRight": {}, repeat: '__count' },
    "selectedit::k": { "selection-utilities.movePrimaryLeft": {}, repeat: '__count' },
    "selectedit::d": { "selection-utilities.deletePrimary": {}, repeat: '__count' },
    "selectedit::s\n": "selection-utilities.splitByNewline",
    "selectedit::ss": "selection-utilities.splitBy",
    "selectedit::sr": "selection-utilities.splitByRegex",
    "selectedit::sc": { "modalkeys.captureChar": {
        acceptAfter: 1,
        executeAfter: [
            { "selection-utilities.splitBy": { text: "__captured" } }
        ]   
    }},
    "selectedit::/s": "selection-utilities.createBy",
    "selectedit::/r": "selection-utilities.createByRegex",
    "selectedit::/c": { "modalkeys.captureChar": {
        acceptAfter: 1,
        executeAfter: [
            { "selection-utilities.createBy": { text: "__captured" } }
        ]   
    }},
    "selectedit::[s": "selection-utilities.includeBy",
    "selectedit::]s": "selection-utilities.excludeBy",
    "selectedit::[r": "selection-utilities.includeByRegex",
    "selectedit::]r": "selection-utilities.excludeByRegex",

    ////////
    // symmetric insertion (around selection)
    ", ": { "selection-utilities.insertAround": { before: " ", after: " " }},
    "g'": { "modalkeys.enterMode": { mode: "syminsert" } },
    "syminsert::\n": { "modalkeys.enterMode": { mode: "normal" } },
    "syminsert::i": { "modalkeys.captureChar": {
        acceptAfter: 1,
        executeAfter: [
            { "selection-utilities.insertAround": {
                before: "__captured",
                after: "__captured",
            }},
            { "selection-utilities.adjustSelections": { dir: "forward" } }
        ]
    }},
    "syminsert::r": [ "modalkeys.enterNormal", "modalkeys.cancelMultipleSelections" ],
    ...(Object.fromEntries(Array.from(":;'\",./?|=+-_*&^%$#@!`~").map(c =>
        ["syminsert::"+c, [
            { "selection-utilities.insertAround": { before: c, after: c }},
            { "selection-utilities.adjustSelections": { dir: "forward" } }
        ]]
    ))),
    'syminsert::\\"': [
        { "selection-utilities.insertAround": { before: '\\"', after: '\\"' }},
    ],
    "syminsert::\\'": [
        { "selection-utilities.insertAround": { before: "\\'", after: "\\'" }},
    ],

    "syminsert::o": "selection-utilities.activeAtEnd",
    "syminsert::O": "selection-utilities.activeAtStart",
    "syminsert::x": [
        { "selection-utilities.adjustSelections": { dir: "backward" } },
        { "selection-utilities.deleteAround": { count: "__count" }}
    ],
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
    "syminsert::{": [
        { "selection-utilities.insertAround": { before: "{", after: "}" }},
        { "selection-utilities.adjustSelections": { dir: "forward" } }
    ],
    "syminsert::[": [
        { "selection-utilities.insertAround": { before: "[", after: "]" }},
        { "selection-utilities.adjustSelections": { dir: "forward" } }
    ],
    "syminsert::(": [
        { "selection-utilities.insertAround": { before: "(", after: ")" }},
        { "selection-utilities.adjustSelections": { dir: "forward" } }
    ],
    "syminsert::<": [
        { "selection-utilities.insertAround": { before: "<", after: ">" }},
        { "selection-utilities.adjustSelections": { dir: "forward" } }
    ],
}}