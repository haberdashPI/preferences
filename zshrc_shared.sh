ZSH_THEME="powerlevel10k/powerlevel10k"
KEYTIMEOUT=1

export JULIA_PKG_DEVDIR="${HOME}/Documents/tools"

plugins=(git fzf z brew fd docker zsh-vi-mode zsh-autosuggestions zsh-syntax-highlighting zsh-interactive-cd asdf)
source $ZSH/oh-my-zsh.sh

export ZVM_VI_EDITOR=nvim

if type brew &>/dev/null; then
  FPATH=$(brew --prefix)/share/zsh/site-functions:$FPATH

  autoload -Uz compinit
  compinit
fi

bindkey '\e;' autosuggest-accept

alias matlab="matlab -nodesktop -nosplash"
alias ll="exa --long --group-directories-first"
alias ls="exa"
alias cat="bat"
alias less="bat"
alias aws-start-pet="aws ec2 start-instances --instance-ids i-03e53bd09cd27f10d --profile idorsia"
alias aws-stop-pet="aws ec2 stop-instances --instance-ids i-03e53bd09cd27f10d --profile idorsia"

function hdir(){
  pushd ~
  exa --long --group-directories-first
}
function udir(){
  pushd ..
  exa --long --group-directories-first
}
function bdir(){
  popd
  exa --long --group-directories-first
}
function idir(){
  pushd "`fd -t d -d 1 | fzf`"
  exa --long --group-directories-first
}
function fdir(){
  pushd "`fd -t d -d 8 | fzf`"
  exa --long --group-directories-first
}


bindkey -s '\eh' 'bdir\n'
bindkey -s '\ek' 'udir\n'
bindkey -s '\ej' 'idir\n'
bindkey -s '\el' 'fdir\n'
bindkey -s '\eg' 'hdir\n'

export MANPAGER="sh -c 'col -bx | bat -l man -p'"
export FZF_DEFAULT_OPTS='--bind tab:down --cycle'
export EDITOR="code -w"


# Case insensitive match
zstyle ':completion:*' matcher-list 'm:{a-zA-Z}={A-Za-z}' 'r:|[._-]=* r:|=*' 'l:|=* r:|=*'

# Group matches and describe.
zstyle ':completion:*:*:*:*:*' menu select
zstyle ':completion:*:matches' group 'yes'
zstyle ':completion:*:options' description 'yes'
zstyle ':completion:*:options' auto-description '%d'
zstyle ':completion:*:corrections' format ' %F{green}-- %d (errors: %e) --%f'
zstyle ':completion:*:descriptions' format ' %F{yellow}-- %d --%f'
zstyle ':completion:*:messages' format ' %F{purple} -- %d --%f'
zstyle ':completion:*:warnings' format ' %F{red}-- no matches found --%f'
zstyle ':completion:*:default' list-prompt '%S%M matches%s'
zstyle ':completion:*' format ' %F{yellow}-- %d --%f'
zstyle ':completion:*' group-name ''
zstyle ':completion:*' verbose yes

