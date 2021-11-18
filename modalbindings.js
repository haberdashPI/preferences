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

module.exports = {
extensions: [
    "dbankier.vscode-quick-select",
    "haberdashpi.vscode-select-by-indent",
    "haberdashpi.selection-utilities",
    "haberdashpi.move-cursor-by-argument",
    "pustelto.bracketeer",
    "wmaurer.change-case",
    "pranshuagrawal.toggle-case",
    "albymor.increment-selection",
    "pkief.markdown-checkbox",
    "edgardmessias.clipboard-manager",
    "stkb.rewrap",
    "haberdashpi.terminal-polyglot",
    "jack89ita.open-file-from-path",
    "koalamer.labeled-bookmarks",
],

docColors: {
    'select': 1,
    'modifier': 3,
    'count': 5,
    'action': 8,
    'history': 10,
    'mode': 12,
    'leader': 16,
},

keybindings: {
    /////////////
    // motions

    // basic movement
    "::doc::h": { kind: "select", label: "←", detail: "move left" },
    "::doc::j": { kind: "select", label: '↓', detail: "move down" },
    "::doc::k": { kind: "select", label: '↑', detail: "move up" },
    "::doc::l": { kind: "select", label: '→', detail: "move right" },
    "::doc::g": { kind: "leader", label: "leader (actions)", detail: "additional commands (mostly actions)" },
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
    "::doc::,": { kind: "leader", label: "leader (extended)", detail: "a miscellaneous list of additonal commands" },
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
    "::doc::gg": { kind: 'select', label: 'to document start'},
    "gg": "cursorTopSelect",

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
    "::doc::%": { kind: 'select', label: 'to bracket', detail: "Move to matching bracket"},
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

    "::doc::R": {kind: "select", label: 'expand to non-whitespace', detail: 'select full line(s), and trim external whitespace'},
    R: [ "expandLineSelection", "selection-utilities.trimSelectionWhitespace" ],
    "::doc::visual::R": {kind: "modifier", label: 'trim whitespace', detail: 'shrink selection to avoid external whitespace'},
    "visual::R":  "selection-utilities.trimSelectionWhitespace" ,
    "::doc::U": {kind: "modifier", label: 'narrow to subword', detail: "Narrow current selection so it starts and stops at a subword (e.g. 'snake' in snake_case)"},
    U: { "selection-utilities.narrowTo": { unit: "subident", boundary: "both", } },

    "::doc::r": {kind: "modifier", label: 'clear', detail: "Clear the current selection"},
    r: "modalkeys.cancelMultipleSelections",
    "::doc:: ": {kind: "mode", label: 'hold', detail: "Start visual mode (enabling selection)"},
    " ": "modalkeys.enableSelection",

    ///////////////////////////////////////////////////////
    // actions

    // insert/append text
    "::doc::i": {kind: "mode", label: 'insert', detail: "Switch to insert mode" },
    i: [ "modalkeys.cancelMultipleSelections", "modalkeys.enterInsert" ],
    "::doc::a": {kind: "mode", label: 'append', detail: "Switch to insert mode, moving cursor to end of current character" },
    a: [ "modalkeys.cancelMultipleSelections", { if: "__char != ''", then: "cursorRight" }, "modalkeys.enterInsert"],

    "::doc::I": {kind: "mode", label: 'insert start', detail: "Switch to insert mode, moving cursor to start of line" },
    I: [
        { "cursorMove": { to: "wrappedLineFirstNonWhitespaceCharacter", select: false } },
        "modalkeys.enterInsert",
    ],

    "::doc::A": {kind: "mode", label: 'append eol', detail: "Switch to insert mode, moving cursor to end of line" },
    A: [ { "cursorMove": { to: "wrappedLineEnd", select: false } }, "modalkeys.enterInsert", ],

    // change
    "::doc::c": {kind: "mode", label: 'change', detail: "Delete all selected text and move to insert mode"},
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

    "::doc::C": {kind: "mode", label: 'change to eol', detail: "Delete all text from here to end of line, and switch to insert mode"},
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

    "::doc::gy": {kind: "action", label: 'join', detail: "Remove newline between current and next line"},
    "gy": countSelectsLines('down', "editor.action.joinLines"),

    "::doc::`": {kind: "action", label: 'swap', detail: "Swap the style of a identifier (e.g. to camel case to snake case)"},
    "::doc::`c": {kind: "action", label: 'camel', detail: "Swap style to lower camel case (`camelCase`)"},
    "`c": "extension.changeCase.camel",
    "::doc::`U": {kind: "action", label: 'constant', detail: "Swap style to constant (`IS_CONSTANT`)"},
    "`U": "extension.changeCase.constant",
    "::doc::`.": {kind: "action", label: 'dot', detail: "Swap style to dot case (`dot.case`)"},
    "`.": "extension.changeCase.dot",
    "::doc::`-": {kind: "action", label: 'kebab', detail: "Swap style to kebab case (`kebab-case`)"},
    "`-": "extension.changeCase.kebab",
    "::doc::`L": {kind: "action", label: 'all lower', detail: "Swap all to lower case"},
    "`L": "extension.changeCase.lower",
    "::doc::`l": {kind: "action", label: 'first lower', detail: "Swap first letter to lower case"},
    "`l": "extension.changeCase.lowerFirst",
    "::doc::` ": {kind: "action", label: 'spaces', detail: "Swap to spaces (`camelCase` -> `camel case`)"},
    "` ": "extension.changeCase.no",
    "::doc::`C": {kind: "action", label: 'Camel', detail: "Swap to uper camel case (`CamelCase`)"},
    "`C": "extension.changeCase.pascal",
    "::doc::`/": {kind: "action", label: 'path', detail: "Swap to 'path' case (`path/case`)"},
    "`/": "extension.changeCase.path",
    "::doc::`_": {kind: "action", label: 'snake', detail: "Swap to snake case (`snake_case`)"},
    "`_": "extension.changeCase.snake",
    "::doc::`s": {kind: "action", label: 'swap', detail: "Swap upper and lower case letters"},
    "`s": "extension.changeCase.swap",
    "::doc::`s": {kind: "action", label: 'title', detail: "Swap to title case (all words have first upper case letter)"},
    "`t": "extension.changeCase.title",
    "::doc::`s": {kind: "action", label: 'all upper', detail: "Swap to use all upper case letters"},
    "`Y": "extension.changeCase.upper",
    "::doc::`s": {kind: "action", label: 'first upper', detail: "Swap first character to upper case"},
    "`u": "extension.changeCase.upperFirst",
    "::doc::`s": {kind: "action", label: 'first upper', detail: "Toggle through all possible cases"},
    "``": "extension.toggleCase",
    "::doc::~": {kind: "action", label: 'swap character', detail: "Swap case of character under the curser"},
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
    "::doc::=": {kind: "action", label: 'inc #', detail: "Increment a number by 1 (increases increment for subsequent selections)"},
    "=": [
        {
            if: "__selections.length === 1",
            then: "editor.emmet.action.incrementNumberByOne",
            else: "extension.incrementSelection",
        },
    ],
    "::doc::+": {kind: "action", label: 'dec #', detail: "Decrement a number by 1 (increases increment for subsequent selections)"},
    "+": [
        {
            if: "__selections.length === 1",
            then: "editor.emmet.action.decrementNumberByOne",
            else: "extension.decrementSelection",
        },
    ],
    "::doc::g=": {kind: "action", label: 'inc all #', detail: "Increment all numbers by 1"},
    "g=": "editor.emmet.action.incrementNumberByOne",
    "::doc::g+": {kind: "action", label: 'dec all #', detail: "Decrement all numbers by 1"},
    "g+": "editor.emmet.action.decrementNumberByOne",

    // check
    "::doc::^": {kind: "action", label: 'toggle check', detail: "Toggle a markdown checkbox"},
    "^": "markdown-checkbox.markCheckbox",

    "::doc::": {kind: "action", label: 'trim white', detail: "Delete all external whitespace (left and right edges)"},
    "ga": "selection-utilities.trimWhitespace",

    // brackets
    "::doc::gx": {kind: "action", label: 'remove pair', detail: "Delete a pairing (e.g. `()`)"},
    "::doc::gx[": {kind: "action", label: 'parens/brackets', detail: "Removes pairs that start with `[`, `(` or `{`"},
    "gx[":  "bracketeer.removeBrackets",
    "::doc::gs": {kind: "action", label: 'swap pair', detail: "Change between different kinds of pairs (e.g. `(` to `{`)"},
    "::doc::gs[": {kind: "action", label: 'parens/brackets', detail: "Swap between `[`, `(` and `{`"},
    "gs[":  "bracketeer.swapBrackets",
    "::doc::gs'": {kind: "action", label: 'quotes', detail: "Change between different quotes"},
    "gs'":  "bracketeer.swapQuotes",
    "::doc::gx'": {kind: "action", label: 'quotes', detail: "Removes quotes (', \" or `)"},
    "gx'":  "bracketeer.removeQuotes",
    "::doc::gi": {kind: "action", label: 'insert pair', detail: "Insert a pairing (e.g. ()) around a selection"},
    "::doc::gi(": {kind: "action", label: 'paren', detail: "Insert parenthesis around selection"},
    "gi(": [ "modalkeys.enterInsert", { "type": { text: "(" }, }, "modalkeys.enterNormal" ],
    "::doc::gi(": {kind: "action", label: 'paren', detail: "Insert parenthesis around selection"},
    "gi<": [ "modalkeys.enterInsert", { "type": { text: "<" }, }, "modalkeys.enterNormal" ],
    "::doc::gi`": {kind: "action", label: 'ticks', detail: "Insert ticks (``) around selection"},
    "gi`": [ "modalkeys.enterInsert", { "type": { text: "`" }, }, "modalkeys.enterNormal" ],
    "::doc::gi\"": {kind: "action", label: 'dbl quotes', detail: "Insert quotes (\"\") around selection"},
    "gi\"": [ "modalkeys.enterInsert", { "type": { "text": "\"" }, }, "modalkeys.enterNormal" ],
    "::doc::gi'": {kind: "action", label: 'sgl quotes', detail: "Insert singel quotes ('') around selection"},
    "gi'": [ "modalkeys.enterInsert", { "type": { text: "'" }, }, "modalkeys.enterNormal" ],
    "::doc::gi*": {kind: "action", label: 'start', detail: "Insert stars (**) around selection"},
    "gi*": [ "modalkeys.enterInsert", { "type": { text: "*" }, }, "modalkeys.enterNormal" ],
    "::doc::gi{": {kind: "action", label: 'curly', detail: "Insert curly brackets ({}) around selection"},
    "gi{": [ "modalkeys.enterInsert", { "type": { text: "{" }, }, "modalkeys.enterNormal" ],
    "::doc::gi[": {kind: "action", label: 'square', detail: "Insert square brackets ([]) around selection"},
    "gi[": [ "modalkeys.enterInsert", { "type": { text: "[" }, }, "modalkeys.enterNormal" ],

    /////////////
    // clipboard actions

    // cut to clipboard
    "::doc::d": {kind: "action", label: "delete", detail: "Delete selection and save to paste buffer"},
    d: countSelectsLines('down', [
        "editor.action.clipboardCutAction",
        "modalkeys.enterNormal"
    ]),

    "::doc::d": {kind: "action", label: "delete to eol", detail: "Delete from cursor to end of line"},
    D: countSelectsLines('up', [
        "modalkeys.cancelMultipleSelections",
        { "cursorMove": { to: "wrappedLineEnd", select: true } },
        "editor.action.clipboardCutAction",
    ],
    [
        "editor.action.clipboardCutAction",
        "editor.action.enterNormal"
    ]),

    "::doc::x": {kind: "action", label: "delete char", detail: "delete the character under the cursor"},
    x: [
        "modalkeys.cancelMultipleSelections",
        { "cursorMove": { to: "right", select: true } },
        "editor.action.clipboardCutAction",
    ],

    "::doc::X": {kind: "action", label: "replace char", detail: "replace the character under the cursor"},
    X: "modalkeys.replaceChar",

    // copy to clipboard
    "::doc::y": {kind: "action", label: "copy", detail: "copy selected text to clipboard"},
    y: countSelectsLines('down', [
        "editor.action.clipboardCopyAction", "modalkeys.cancelMultipleSelections",
    ]),

    // copy line to clipboard
    "::doc::Y": {kind: "action", label: "copy (eol/up)", detail: "without a count: copy to end of line; with a count: copy this and the previous N lines"},
    Y: countSelectsLines('up', [
        { "cursorMove": { to: "wrappedLineEnd", select: true } },
        "editor.action.clipboardCopyAction",
        "modalkeys.cancelMultipleSelections"
    ], [
        "editor.action.clipboardCopyAction",
        "modalkeys.cancelMultipleSelections"
    ]),

    // paste after
    "::doc::v": {kind: "action", label: "paste after", detail: "Paste the next after the cursor/selection"},
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
    "::doc::V": {kind: "action", label: "paste before", detail: "Paste the next before the cursor/selection"},
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
    "::doc::gV": {kind: "action", label: "paste replace", detail: "Paste, replacing the selected text"},
    "gV": "editor.action.clipboardPasteAction",

    // paste from history
    "::doc::gv": {kind: "action", label: "paste history", detail: "Paste from clipboard history"},
    "gv": "clipboard-manager.editor.pickAndPaste" ,


    // paste lines below
    "::doc::,v": {kind: "action", label: "paste after line", detail: "Paste text after current line"},
    ",v": [
        "expandLineSelection",
        "selection-utilities.activeAtEnd",
        "modalkeys.cancelMultipleSelections",
        "editor.action.clipboardPasteAction",
    ],

    // paste lines above
    "::doc::,V": {kind: "action", label: "paste before line", detail: "Paste text before current line"},
    ",V": [
        "expandLineSelection",
        "selection-utilities.activeAtStart",
        "modalkeys.cancelMultipleSelections",
        "editor.action.clipboardPasteAction",
    ],


    // begin line below
    "::doc::o": {kind: "mode", label: "open below", detail: "open a line below current line and enter insert"},
    o: ["editor.action.insertLineAfter", "modalkeys.enterInsert"],
    "::doc::go": {kind: "action", label: "open below", detail: "open a line below current line"},
    go: "editor.action.insertLineAfter",
    "::doc::visual::o": {kind: "mode", label: "open below", detail: "open a line below current selection and enter insert"},
    "visual::o": "selection-utilities.activeAtEnd",
    "::doc::O": {kind: "mode", label: "open above", detail: "open a line above current line and enter insert"},
    O: [ "editor.action.insertLineBefore", "modalkeys.enterInsert" ],
    "::doc::gO": {kind: "action", label: "open above", detail: "open a line above current line"},
    gO: "editor.action.insertLineBefore",
    "::doc::visual::o": {kind: "mode", label: "open before", detail: "open a line above current selection and enter insert"},
    "visual::O": "selection-utilities.activeAtStart",

    // line indent
    "::doc::>": {kind: "action", label: "indent", detail: "Indent lines"},
    ">": countSelectsLines('down', "editor.action.indentLines", [
        "editor.action.indentLines", 
        "modalkeys.cancelMultipleSelections"
    ]),
    "::doc::>": {kind: "action", label: "deindent", detail: "Deindent lines"},
    "<": countSelectsLines('down', "editor.action.outdentLines", [
        "editor.action.outdentLines", 
        "modalkeys.cancelMultipleSelections"
    ]),
    "::doc::>": {kind: "action", label: "format", detail: "Format code"},
    "g>": countSelectsLines('down', "editor.action.formatSelection", [
        "editor.action.formatSelection",
        "modalkeys.cancelMultipleSelections"
    ]),

    "::doc::,f": {kind: "action", label: "open file", detail: "Open file using quick open"},
    ",f": "workbench.action.quickOpen",
    "::doc::,r": {kind: "action", label: "open recent", detail: "Open recent file"},
    ",r": "workbench.action.openRecent",
    "::doc:::": {kind: "action", label: "command", detail: "Show the VSCode command palette"},
    ":": "workbench.action.showCommands",
    "::doc::,g": {kind: "action", label: "goto line", detail: "Use VSCode goto line command"},
    ",g": "workbench.action.gotoLine",

    ///////////////////////
    // history

    "::doc::z": {kind: "history", label: "undo", detail: "VSCode Undo"},
    z: [ "undo", "modalkeys.cancelMultipleSelections", "modalkeys.untouchDocument", ],
    "::doc::Z": {kind: "history", label: "undo", detail: "VSCode Redo"},
    Z: [ "redo", "modalkeys.cancelMultipleSelections", "modalkeys.untouchDocument", ],
    "::doc::-": {kind: "history", label: "cursor undo", detail: "VSCode Cursor Undo"},
    "-": "cursorUndo",
    "::doc::_": {kind: "history", label: "cursor redo", detail: "VSCode Cursor Redo"},
    "_": "cursorRedo",

    "::doc::.": {kind: "history", label: "repeat", detail: "repeat last sentence (last selection and action pair)"},
    ".": [
        "modalkeys.repeatLastUsedSelection",
        "modalkeys.repeatLastChange",
    ],
    "::doc::.": {kind: "history", label: "repeat select", detail: "repeat last used selection (last selection followed by action pair)"},
    "'.": "modalkeys.repeatLastUsedSelection",
    "::doc::g.": {kind: "history", label: "repeat action", detail: "repeat last action"},
    "g.": "modalkeys.repeatLastChange",

    "::doc::q": {kind: "history", label: "record macro", detail: "toggle macro recording (use count to label it)"},
    "q": { "modalkeys.toggleRecordingMacro": { register: "__count" } },
    "::doc::Q": {kind: "history", label: "record macro", detail: "replay the macro (specify which macro using a count)"},
    "Q": { "modalkeys.replayMacro": { register: "__count" } },
    "::doc::'q": {kind: "history", label: "cancel record", detail: "stop recording a macro (don't save it)"},
    "'q": "modalkeys.cancelRecordingMacro",

    /////////////
    // comment actions
    "::doc::g;": {kind: "action", label: "comment →", detail: "select next comment"},
    "g;":  countSelectsLines('down', [
        "editor.action.commentLine", "modalkeys.cancelMultipleSelections",
    ]),
    "::doc::g:": {kind: "action", label: "comment ←", detail: "select previous comment"},
    "g:":  countSelectsLines('down', [
        "editor.action.blockComment", "modalkeys.cancelMultipleSelections",
    ]),
    "::doc::gq": {kind: "action", label: "wrap", detail: "wrap text, preserving commenting"},
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