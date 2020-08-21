if exists('g:vscode')
  let s:plugin_dir = '~/.local/share/nvim/plugged'
  call plug#begin(s:plugin_dir)
  Plug 'tpope/vim-surround'
  Plug 'justinmk/vim-sneak'
  Plug 'tommcdo/vim-exchange'
  Plug 'michaeljsmith/vim-indent-object'
  Plug 'svermeulen/vim-yoink'
  Plug 'bkad/CamelCaseMotion'
  Plug 'kana/vim-operator-user'
  Plug 'kana/vim-textobj-user'
  Plug 'sgur/vim-textobj-parameter'
  call plug#end()

  let g:mapleader = ' '
  let g:maplocalleader = '^'
  nnoremap <Leader>? :noh<cr>

  set smartcase
  set softtabstop=2
  set shiftwidth=2
  set expandtab

  set timeoutlen=1200

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " code commenting

  xmap gc  <Plug>VSCodeCommentary
  nmap gc  <Plug>VSCodeCommentary
  omap gc  <Plug>VSCodeCommentary
  nmap gcc <Plug>VSCodeCommentaryLine

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " vim sneak
  nmap f <Plug>Sneak_f
  nmap F <Plug>Sneak_F
  nmap t <Plug>Sneak_t
  nmap T <Plug>Sneak_T

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " terminal/REPL commands

  function! s:sendREPLSelection()
    let startPos = getpos("'<")
    let endPos = getpos("'>")
    call VSCodeNotifyRangePos("terminal-polyglot.send-text", startPos[1], endPos[1], startPos[2], endPos[2]+1, 1)
  endfunction

  function! s:sendREPLText(opfunc)
    if a:opfunc ==# 'line'
      let startLine = line("'[")
      let endLine = line("']")
      let endPos = getpos("']")
      call VSCodeCallRange("terminal-polyglot.send-text", startLine, endLine, 1)
    else
      let startPos = getpos("'[")
      let endPos = getpos("']")
      call VSCodeCallRangePos("terminal-polyglot.send-text", startPos[1], endPos[1], startPos[2], endPos[2]+1, 1)
    endif
  endfunction

  nnoremap <silent> <Leader>k :<C-u>set operatorfunc=<SID>sendREPLText<CR>g@
  vnoremap <silent> <Leader>k :<C-u>call <SID>sendREPLSelection()<CR>
  nnoremap <silent> <Leader>j :<C-u>call VSCodeNotify("terminal-polyglot.send-text")<CR>
  nnoremap <silent> <Leader>cd :<C-u>call VSCodeNotify("terminal-polyglot.cd")<CR>
  nnoremap <silent> <Leader>gcd :<C-u>call VSCodeNotify("terminal-polyglot.global_cd")<CR>
  xnoremap <silent> <Leader>r :<C-u>call VSCodeNotify("workbench.action.openRecent")<CR>

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " navigate to errors/diffs
  nnoremap <silent> ]e :<C-u>call VSCodeNotify("editor.action.marker.next")<CR>
  nnoremap <silent> ]c :<C-u>call VSCodeNotify("workbench.action.editor.nextChange")<CR>
  nnoremap <silent> [c :<C-u>call VSCodeNotify("workbench.action.editor.previousChange")<CR>
  nnoremap <silent> ]d :<C-u>call VSCodeNotify("editor.action.dirtydiff.next")<CR>
  nnoremap <silent> [d :<C-u>call VSCodeNotify("editor.action.dirtydiff.previous")<CR>

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " paste history integrated with system clipboard

  nmap [p <plug>(YoinkPostPasteSwapBack)
  nmap ]p <plug>(YoinkPostPasteSwapForward)

  nmap p <plug>(YoinkPaste_p)
  nmap P <plug>(YoinkPaste_P)

  let g:yoinkIncludeDeleteOperations = 1
  let g:yoinkMaxItems = 50
  set clipboard=unnamed

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " sub-word motions

  map <silent> w <Plug>CamelCaseMotion_w
  map <silent> b <Plug>CamelCaseMotion_b
  map <silent> e <Plug>CamelCaseMotion_e
  map <silent> ge <Plug>CamelCaseMotion_ge
  sunmap w
  sunmap b
  sunmap e
  sunmap ge

  omap <silent> iw <Plug>CamelCaseMotion_iw
  xmap <silent> iw <Plug>CamelCaseMotion_iw
  omap <silent> ib <Plug>CamelCaseMotion_ib
  xmap <silent> ib <Plug>CamelCaseMotion_ib
  omap <silent> ie <Plug>CamelCaseMotion_ie
  xmap <silent> ie <Plug>CamelCaseMotion_ie

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " command on selection

  function! s:showCommands()
    normal! gv
    let startPos = getpos("v")
    let endPos = getpos(".")
    call VSCodeNotifyRangePos("workbench.action.showCommands", startPos[1], endPos[1], startPos[2], endPos[2], 1)
  endfunction

  xnoremap <silent> <leader>p :<C-u>call <SID>showCommands()<CR>
else
  if has('nvim')
    let s:plugin_dir = '~/.local/share/nvim/plugged'
  else
    let s:plugin_dir = '~/.vim/plugged'
  end

  call plug#begin(s:plugin_dir)

  " syntax plugins
  Plug 'phanviet/vim-monokai-pro'
  Plug 'vim-scripts/SyntaxRange'
  Plug 'JuliaEditorSupport/julia-vim'
  Plug 'maverickg/stan.vim'
  Plug 'editorconfig/editorconfig-vim'
  Plug 'cespare/vim-toml'
  Plug 'maralla/vim-toml-enhance'
  Plug 'ruyadorno/vim-change-indent'
  Plug 'ekalinin/Dockerfile.vim'
  Plug 'svermeulen/vim-yoink'

  " text manipulation/navigation plugins
  Plug 'bkad/CamelCaseMotion'
  Plug 'FooSoft/vim-argwrap'
  Plug 'kana/vim-operator-user'
  Plug 'kana/vim-textobj-user'
  Plug 'rhysd/vim-textobj-anyblock'
  Plug 'michaeljsmith/vim-indent-object'
  " Plug 'rhysd/vim-operator-surround'
  Plug 'tpope/vim-surround'
  Plug 'sgur/vim-textobj-parameter'
  Plug 'tommcdo/vim-lion'
  Plug 'tpope/vim-endwise'
  Plug 'tpope/vim-repeat'
  Plug 'justinmk/vim-sneak'
  " Plug 'terryma/vim-multiple-cursors'
  Plug 'easymotion/vim-easymotion'
  Plug 'bronson/vim-visual-star-search'
  Plug 'tommcdo/vim-exchange'
  Plug 'tpope/vim-commentary'
  Plug 'joom/latex-unicoder.vim'

  " language smarts (linting, goto def, etc..)
  Plug 'w0rp/ale'
  Plug 'ludovicchabant/vim-gutentags'
  Plug 'Shougo/deoplete.nvim', { 'do': ':UpdateRemotePlugins' }
  Plug 'autozimu/LanguageClient-neovim', {
      \ 'branch': 'next',
      \ 'do': 'bash install.sh',
      \ }

  " version control
  Plug 'airblade/vim-gitgutter'
  Plug 'tpope/vim-fugitive'
  Plug 'gregsexton/gitv'

  " appearance
  if !exists("g:gui_oni")
    Plug 'vim-airline/vim-airline'
    Plug 'vim-airline/vim-airline-themes'
    " Plug 'ayu-theme/ayu-vim-airline'
  else
    set noshowmode
    set noruler
    set laststatus=0
    set noshowcmd
  end
  Plug 'haishanh/night-owl.vim' " or other package manager

  " UI plugins
  Plug 'reedes/vim-pencil'
  Plug 'haberdashPI/goyo.vim', {'branch': 'nvim-resize'} " for now, use my version, until pull request accepted
  Plug 'tpope/vim-eunuch'
  Plug 'junegunn/fzf'
  Plug 'junegunn/fzf.vim'
  Plug 'tpope/vim-rsi'
  " Plug 'tpope/vim-vinegar'
  Plug 'simnalamburt/vim-mundo'
  " Plug 'vim-scripts/YankRing.vim'
  Plug 'jremmen/vim-ripgrep'
  Plug 'vim-scripts/Greplace.vim'
  Plug 'mhinz/vim-startify'
  Plug 'wesQ3/vim-windowswap'
  Plug 'simnalamburt/vim-mundo'

  if !empty(glob('~/Google Drive/Home/Software/vim-multi-repl'))
    Plug '~/Google Drive/Home/Software/vim-multi-repl'
  elseif !empty(glob('~/Documents/play/vim-multi-repl'))
    Plug '~/Documents/play/vim-multi-repl'
  elseif !empty(glob('~/config/vim-multi-repl'))
    Plug '~/config/vim-multi-repl'
  else
    Plug 'haberdashPI/vim-multi-repl'
  end

  " utilities
  Plug 'dbakker/vim-projectroot'

  call plug#end()

  function! s:DiffWithSaved()
    let l:filetype=&filetype
    diffthis
    vnew | r # | normal! 1Gdd
    diffthis
    exe 'setlocal bt=nofile bh=wipe nobl noswf ro ft=' . l:filetype
  endfunction
  com! DiffSaved call s:DiffWithSaved()

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " sub-word motions

  map <silent> w <Plug>CamelCaseMotion_w
  map <silent> b <Plug>CamelCaseMotion_b
  map <silent> e <Plug>CamelCaseMotion_e
  map <silent> ge <Plug>CamelCaseMotion_ge
  sunmap w
  sunmap b
  sunmap e
  sunmap ge

  omap <silent> iw <Plug>CamelCaseMotion_iw
  xmap <silent> iw <Plug>CamelCaseMotion_iw
  omap <silent> ib <Plug>CamelCaseMotion_ib
  xmap <silent> ib <Plug>CamelCaseMotion_ib
  omap <silent> ie <Plug>CamelCaseMotion_ie
  xmap <silent> ie <Plug>CamelCaseMotion_ie

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " general interface settings

  let g:mapleader = ' '
  let g:maplocalleader = '^'

  " in most terminals, C-6 == C-^, but in some cases, we need to make the
  " mapping explicit
  noremap <C-6> <C-^>

  set visualbell
  set timeoutlen=1200
  set hidden
  set tildeop

  set mouse=a
  set lazyredraw
  set history=1000
  set wildmode=list:longest
  set backspace=indent,eol,start

  set hlsearch incsearch
  nnoremap <Leader>? :noh<cr>
  nnoremap <Leader>X :syntax sync fromstart<cr>

  nnoremap <Leader>M :set lines=999 columns=9999<cr>

  set gdefault
  set noedcompatible

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

  nnoremap <silent> [c :<C-u>call VSCodeNotify("workbench.action.editor.previousChange")<CR>
  nmap [p <plug>(YoinkPostPasteSwapBack)
  nmap ]p <plug>(YoinkPostPasteSwapForward)

  nmap p <plug>(YoinkPaste_p)
  nmap P <plug>(YoinkPaste_P)

  let g:yoinkIncludeDeleteOperations = 1
  let g:yoinkMaxItems = 50
  set clipboard=unnamed

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " vimrc quick config
  if hostname() =~# 'Nickoli.local' || hostname() =~# 'nickoli.hwcampus'
    let g:vimrc_file = '~/googledrive/Preferences/dot_vimrc/.vimrc'
    let $PATH = $PATH.':/Library/TeX/texbin'
  elseif hostname() =~# 'lcap.cluster'
    let g:vimrc_file = '~/preferences/dot_vimrc/.vimrc'
  elseif hostname() =~# 'deus1.hwcampus.jhu.edu'
    let g:vimrc_file = '~/googledrive/Preferences/dot_vimrc/.vimrc'
    let $PATH = $PATH.':/Library/TeX/texbin'
  elseif hostname() ==# 'Claude.local'
    let g:vimrc_file = '~/Google Drive/Preferences/dot_vimrc/.vimrc'
  elseif hostname() =~# 'Mycroft'
    let g:vimrc_file = '~/googledrive/Preferences/dot_vimrc/.vimrc'
    let $PATH = $PATH.':/Library/TeX/texbin'
  elseif hostname() =~# 'bc-login\d\+'
    let g:vimrc_file = '~/config/dot_vimrc/.vimrc'
  else
    echoer 'Location of dot_vimrc project is unknown, using .vimrc directly.'
    let g:vimrc_file = '~/.vimrc'
  end

  nnoremap <Leader>vim :exe ':tabedit '.g:vimrc_file<cr>
  nnoremap <Leader>vimr :exe ':source '.g:vimrc_file<cr>

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " quick commands

  command! -nargs=1 -complete=file Skim :exe '! open -a /Applications/Skim.app '.<f-args>

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " motions

  " move up or down to the next line with nowhitespace text in the same column
  nnoremap g+ :call search('\%' . virtcol('.') . 'v\S', 'wW')<CR>
  nnoremap g- :call search('\%' . virtcol('.') . 'v\S', 'bW')<CR>

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " appearance

  set ignorecase
  set smartcase

  set number relativenumber

  augroup numbertoggle
    autocmd!
    autocmd BufEnter,FocusGained,InsertLeave * if &buftype != 'terminal' && (!exists('t:goyo_pads_setup') || !t:goyo_pads_setup) | set relativenumber | endif
    autocmd BufLeave,FocusLost,InsertEnter   * if &buftype != 'terminal' | set norelativenumber | endif
  augroup END
  " augroup CursorLine
  "   au!
  "   au VimEnter,WinEnter,BufWinEnter * setlocal cursorline
  "   au WinLeave * setlocal nocursorline
  " augroup END

  set guioptions-=m  "remove menu bar
  set guioptions-=T  "remove toolbar
  set guioptions-=r  "remove right-hand scroll bar
  set guioptions-=L  "remove left-hand scroll bar

  " available at https://github.com/ryanoasis/nerd-fonts/tree/master/patched-fonts/SourceCodePro/Regular/complete
  if !has('gui_vimr')
    set guifont=SauceCodePro_Nerd_Font_Mono:h12
  end
  " in vimr, you have to manually set the font under preferences

  set winwidth=88
  let g:win_resize_autofix = 1
  function! ResizeWindows()
    if g:win_resize_autofix == 1 && mode() !=# 't'
      execute "normal \<c-w>=\<Plug>(repl-resize)"
    endif
  endfunction

  " if !exists("g:gui_oni")
    augroup WinResize
      au!
      au WinEnter * call ResizeWindows()
    augroup END
    nnoremap <c-w>: :let g:win_resize_autofix=!g:win_resize_autofix<cr>
  " end

  """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " color theme
  set termguicolors     " enable true colors support
  " let ayucolor="dark"   " for dark version of theme
  " colorscheme ayu
  colorscheme monokai_pro
  highlight MatchParen ctermbg=lightblue guibg=lightblue

  " highlight EndOfBuffer guifg=bg ctermfg=bg

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " fast search and replace

  vnoremap <Leader>R "sy:%s/<c-r>s/
  nnoremap <Leader>R "sye:%s/<c-r>s/
  let g:repl_size = 15

  let g:repl_program = "/bin/bash --login"
  if hostname() =~# 'bc-login\d\+'
    let g:repl_path_fix = '/home-net/home-\d/'
    let g:repl_path_fix_with = '/home/'
  endif

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " undo history
  set undofile

  " uses a specific project directory when were in a project to avoid adding
  " lots of extra files
  function! SetupUndo()
    let &l:undodir=$HOME.'/.vimundo/'
    call system('mkdir ' . &l:undodir)
  endfunction

  augroup UndoHistory
    au!
    au BufEnter * call SetupUndo()
  augroup END

  nnoremap <Leader>U :MundoToggle<CR>

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " custom navigation commands

  nnoremap cd /\%<C-R>=virtcol(".")<CR>v\S<CR>
  nnoremap cu ?\%<C-R>=virtcol(".")<CR>v\S<CR>

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " argwrap configuraiton

  noremap <silent> gqa :ArgWrap<CR>

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " latex unicode (in modes other than julia)

  inoremap <C-l> <Esc>:call unicoder#start(1)<CR>

  augroup Tex
    au FileType tex setlocal spell spelllang=en_us
  augroup END

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " terminal configuration
  tnoremap ƒ <esc>f
  tnoremap ∫ <esc>b
  tnoremap ∂ <esc>d
  tnoremap ∆ <esc>j
  tnoremap ˙ <esc>h
  tnoremap ˚ <esc>k
  tnoremap ¬ <esc>l
  tnoremap <a-backspace> <esc><backspace>

  nmap <Leader>.. <Plug>(repl-send-text)

  function! ToggleKeepNormal()
    if &buftype ==# 'terminal'
      let b:keep_normal = !getbufvar('%','keep_normal',0)
      if b:keep_normal
        echo 'Terminal will stay in normal mode.'
      else
        echo 'Terminal will return to terminal mode on refocus.'
      endif
    endif
  endfunction

  function! MaybeStartInsert()
    if !getbufvar('%','keep_normal',0)
      startinsert
    endif
  endfunction

  if has('nvim')
    augroup NeoVimTerm
      au!
      au BufEnter * if &buftype == 'terminal' | call MaybeStartInsert() | endif
      au TermOpen * set nonumber norelativenumber
    augroup END

    tnoremap <silent> <c-w> <c-\><c-n><c-w>
    nnoremap <silent> <Leader>n :let b:keep_normal=0<cr>a
  end

  nnoremap - :term<cr>Aexl<cr>

  """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  "" surround operator

  "map <silent>( <Plug>(operator-surround-append)

  "nmap <silent>)d <Plug>(operator-surround-delete)<Plug>(textobj-anyblock-a)
  "nmap <silent>)r <Plug>(operator-surround-replace)<Plug>(textobj-anyblock-a)

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " sneak commands
  nmap f <Plug>Sneak_f
  nmap F <Plug>Sneak_F
  nmap t <Plug>Sneak_t
  nmap T <Plug>Sneak_T
  " map <Leader>, <Plug>Sneak_,

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " multiple cursor settings
  let g:multi_cursor_quit_key = '<C-g>'

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " indentation/editorconfig

  augroup Appearance
    au!
    au BufWinEnter * set cc=81
  augroup END
  set autoindent
  set smartindent

  set softtabstop=2
  set shiftwidth=2
  set expandtab

  let g:EditorConfig_max_line_indicator = 'line'

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " set working directory

  function! SetDirByProject(path)
    let l:dir = projectroot#get(a:path)
    if empty(l:dir)
      if !empty(a:path) && !(a:path =~# 'term:')
        execute 'cd '  . fnamemodify(a:path,':h')
      endif
    else
      execute 'cd '  . l:dir
    endif
  endfunction

  augroup WorkingDir
    au!
    au BufEnter * call SetDirByProject(expand('%'))
  augroup END

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " ale

  let g:airline#extensions#ale#enabled=1
  let g:ale_set_signs = 0
  let g:ale_linters = {}
  highlight link ALEError SpellBad
  highlight link ALEErrorLine ALEError
  highlight ALEWarningLine cterm=underline gui=underline
  highlight ALEInfoLine cterm=underline gui=underline

  nnoremap ]e :ALENext<CR>
  nnoremap [e :ALEPrevious<CR>

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " R configuration

  let g:ale_r_lintr_options = 'with_defaults(assignment_linter = NULL,commas_linter=NULL,infix_spaces_linter=NULL,spaces_left_parentheses_linter=NULL)'

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " Pencil configuration

  let g:pencil#conceallevel = 0

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " Julia configuration
  let g:tagbar_type_julia = {
    \ 'ctagstype' : 'julia',
    \ 'kinds'     : ['a:abstract', 'i:immutable', 't:type',
    \                'f:function', 'm:macro']
    \ }

  augroup Julia
    au!
    au FileType julia setlocal spell spelllang=en_us
    au FileType julia set commentstring=#\ %s
    au FileType julia call SyntaxRange#Include('R\"\"\"', '\"\"\"','r',
          \ 'NonText')
    au FileType julia call SyntaxRange#Include('py\"\"\"', '\"\"\"','python',
          \ 'NonText')
    au FileType julia call SyntaxRange#Include('mat\"\"\"', '\"\"\"','matlab',
          \ 'NonText')
    au FileType julia nnoremap <localleader>f :call julia#toggle_function_blockassign()<cr>
    " au FileType julia
    "       \ let b:endwise_addition = 'end' |
    "       \ let b:endwise_words = 'function,if,for,begin,do' |
    "       \ let b:endwise_syngroups = 'juliaFunctionBlock,juliaForBlock,juliaBeginBlock,juliaWhileBlock,juliaConditionalBlock,juliaMacroBlock,juilaQuoteBlock,juliaTypesBlock,juliaImmutableBLock,juliaExceptionBlock,juliaLetBlock,juliaDoBlock,juliaModuleBlock'
  augroup END

  runtime macros/matchit.vim

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " python config

  let g:ale_linters.python = ['flake8']
  let g:ale_python_flake8_options = '--ignore E111,E11,E114,E302,E121,E231,E226,E127,W:104'
  " let g:LanguageClient_serverCommands = { 'python': ['/Users/davidlittle/anaconda3/bin/pyls'] }

  nnoremap <silent> K :call LanguageClient#textDocument_hover()<CR>
  nnoremap <silent> gd :call LanguageClient#textDocument_definition()<CR>

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " Markdown configuration

  augroup Markdown
    au!
    au FileType markdown setlocal spell spelllang=en_us
    au FileType markdown call SyntaxRange#Include('```vim','```','vim','NonText')
    au FileType markdown call SyntaxRange#Include('```sh','```','sh','NonText')
    au FileType markdown call SyntaxRange#Include('```R','```','r','NonText')
    au FileType markdown call SyntaxRange#Include('```julia','```','julia',
          \ 'NonText')
    au FileType markdown call SyntaxRange#Include('```python','```','python',
          \ 'NonText')
    au FileType markdown call SyntaxRange#Include('```matlab','```','matlab',
          \ 'NonText')
  augroup END

  """"""""""""""""""""""""""""""""""""""""
  " attempt #1 to add linting
  "
  " let g:default_julia_version = '0.6'

  " " language server
  " let g:LanguageClient_autoStart = 1
  " let g:LanguageClient_serverCommands = {
  " \   'julia': ['julia', '--startup-file=no', '--history-file=no', '-e', '
  " \       using LanguageServer;
  " \       server = LanguageServer.LanguageServerInstance(STDIN, STDOUT, false);
  " \       server.runlinter = true;
  " \       run(server);
  " \   '],
  " \ }

  " nnoremap <silent> K :call LanguageClient_textDocument_hover()<CR>
  " nnoremap <silent> gd :call LanguageClient_textDocument_definition()<CR>

  """"""""""""""""""""""""""""""""""""""""
  " attempt #2 to add linting

  " if executable('julia')
    " augroup JuliaLSP
      " au!
      " au User lsp_setup call lsp#register_server({
        " \ 'name': 'julia-language-server',
        " \ 'cmd': {server_info->['julia --startup-file=no --history-file=no ' .
        " \         '-e using LanguageServer; ' .
        " \         'server = LanguageServer.LanguageServerInstance(STDIN, STDOUT, false);' .
        " \         'server.runlinter = true;' .
        " \         'run(server);'}
        " \ 'root_uri': {server_info->lsp#path_to_uri(projectroot#get(expand('%')))},
        " \ 'whitelist': ['julia']
        " \ })
    " augroup END
  " endif

  " nnoremap <silent> K :LspHover<CR>
  " nnoremap <silent> gd :LspDefinition<CR>

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " MATLAB configuration

  if hostname() =~# 'nickoli.hwcampus' || hostname() =~# 'Nickoli.local'
    let g:ale_matlab_mlint_executable = '/Applications/MATLAB_R2019b.app/bin/maci64/mlint'
  elseif hostname() ==# 'lcap.cluster'
    echom 'no mlint location configured'
  elseif hostname() ==# 'deus1.hwcampus.jhu.edu'
    let g:ale_matlab_mlint_executable = '/Applications/MATLAB_R2017a.app/bin/maci64/mlint'
  elseif hostname() =~# 'Mycroft'
    let g:ale_matlab_mlint_executable = '/Applications/MATLAB_R2018a.app/bin/maci64/mlint'
  elseif hostname() ==# 'Claude.local'
    let g:ale_matlab_mlint_executable = '/Applications/MATLAB_R2017a.app/bin/maci64/mlint'
  elseif hostname() =~# 'bc-login\d\+'
    let g:ale_matlab_mlint_executable = 'mlint'
  else
    echoer 'Location of mlint is unknown. Please update .vimrc to get linting in MATLAB.'
  end

  augroup MATLAB
    au!
    au FileType matlab set commentstring=%\ %s
  augroup END

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " yank ring
  " let g:yankring_replace_n_pkey='<c-y>'
  " let g:yankring_replace_n_nkey='<c-h>'

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " airline

  let g:airline_powerline_fonts = 1
  let g:airline_theme = 'night_owl'
  let g:airline_detect_spell=0

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " fugitive configuration

  noremap <silent><Leader>G :Gstatus<CR>

  " manual refresh until this issue is resolved: https://github.com/airblade/vim-gitgutter/issues/502
  nnoremap <silent><Leader>gg :GitGutterAll<CR>

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " rsi

  imap ∫ <m-b>
  imap ∂ <m-d>
  cmap ∂ <m-d>
  imap ƒ <m-f>

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " startify

  let g:startify_session_persistence = 1
  let g:startify_change_to_vcs_root = 1
  let g:startify_session_autoload = 1
  nnoremap <Leader>S :Startify<CR>

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " convienient save shortcut

  nnoremap <Leader>s :update<CR>
  inoremap <C-s> <Esc>:update<CR>
  vmap <Leader>s <esc>:w<CR>gv

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " fzf fuzzy searching
  " NOTE: to install this on a new machine
  " you have to install the binary for fzf
  " (e.g. via brew install fzf)
  " if !exists("g:gui_oni")
    set runtimepath+=/usr/local/opt/fzf
    nnoremap <silent><C-p>f :execute ":Files " . projectroot#get(expand('%'))<CR>
    nnoremap <silent><C-p>b :Buffers<CR>
    nnoremap <silent><C-p>r :History<CR>
    nnoremap <silent><C-p>c :Commands<CR>
    nnoremap <silent><C-p>s :Rg<CR>
    nnoremap <silent><C-p>l :BLines<CR>
  " endif

  """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " Easy Motion
  let g:EasyMotion_do_mapping=0
  let g:EasyMotion_smartcase=1

  " <Leader>f{char} to move to {char}
  map  <Leader>a <Plug>(easymotion-bd-f)
  nmap <Leader>a <Plug>(easymotion-s)

  " Move to line
  nmap <Leader>L <Plug>(easymotion-overwin-line)
  vmap <Leader>L <Plug>(easymotion-bd-jk)

  " Move to word
  nmap <Leader>w <Plug>(easymotion-overwin-w)

  """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  " vim-multi-term

  nmap <Leader>k <Plug>(repl-send-motion)
  vmap <silent><Leader>k <Plug>(repl-send-text)
  nmap <Leader>j <Plug>(repl-send-text)

end
