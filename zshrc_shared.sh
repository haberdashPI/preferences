ZSH_THEME="powerlevel10k/powerlevel10k"
KEYTIMEOUT=1
export JULIA_PKG_USE_CLI_GIT="true"
export JULIA_PKG_DEVDIR="${HOME}/Documents/tools"

export ZVM_INIT_MODE=sourcing

plugins+=(z brew fd docker zsh-vi-mode fzf zsh-autosuggestions zsh-syntax-highlighting zsh-interactive-cd asdf)
source $ZSH/oh-my-zsh.sh

export ZVM_VI_EDITOR=nvim

if type brew &>/dev/null; then
  FPATH=$(brew --prefix)/share/zsh/site-functions:$FPATH

  autoload -Uz compinit
  compinit
fi

alias matlab="matlab -nodesktop -nosplash"
alias ll="exa --long --group-directories-first"
alias ls="exa"
export EC2_INSTANCE_ID=i-08c11ad6928e88948
alias aws-start-pet="aws ec2 start-instances --instance-ids $EC2_INSTANCE_ID --profile pet"
alias aws-stop-pet="aws ec2 stop-instances --instance-ids $EC2_INSTANCE_ID --profile pet"
alias aws-sleep-pet-force="aws ec2 stop-instances --instance-ids $EC2_INSTANCE_ID --profile pet --hibernate"
alias aws-restart-pet="aws ec2 reboot-instances --instance-ids $EC2_INSTANCE_ID --profile pet"
alias aws-pet-status="aws ec2 describe-instance-status --instance-ids $EC2_INSTANCE_ID --profile pet | jq '.InstanceStatuses[0].InstanceState.Name'"

alias aws-get-instance-type="aws --profile pet ec2 describe-instances --filters Name=tag:Name,Values=dlittle-pet-instance --query 'Reservations[0].Instances[0].InstanceType' --output text"

source ${HOME}/Documents/preferences/change_ec2_instance_type.sh

aws-set-instance-type() {
  instance=`echo "t3.xlarge\nr6a.xlarge\nbr6a.2xlarge\nr5.xlarge\nm5a.2xlarge\nm6a.2xlarge\ng4dn.xlarge" | fzf`
  AWS_PROFILE=pet change_ec2_instance_type -vfr -i $EC2_INSTANCE_ID -t $instance
}

alias awsp="aws configure list-profiles | fzf --height=20% | read AWS_PROFILE"

jlfmt() {
    if [ -z $1 ]; then
      julia --startup-file=no --project=@format -e "using JuliaFormatter; format(\".\", YASStyle())"
    else
      julia --startup-file=no --project=@format -e "using JuliaFormatter; format(\"$1\", YASStyle())"
    fi
}

pluto() {
  julia --project=@pluto -e 'using Pluto; Pluto.run(; auto_reload_from_file=true)'
}

beacon-jl-templates() {
  julia --project=@templates -e 'using BeaconPkgTemplates; prompt_new_beacon_package()'
}

# pet hibernation
aws-sleep-pet() {
    local ids profile
    ids="i-0f3a93ed98733b772"

    if ! ssh -A dlittle.pets.beacon.lol "/home/linuxbrew/.linuxbrew/bin/rg -q 'hibinit-agent.*s sufficient swap available' /var/log/syslog"; then
        echo "Swap not sufficient to hibernate"
        return 1
    fi

    if ! ssh -A dlittle.pets.beacon.lol "/home/linuxbrew/.linuxbrew/bin/rg -q 'hibinit-agent.service: Succeeded.' /var/log/syslog"; then
        echo "Did not find expected 'success' after hibernation setup"
        return 1
    fi

    echo "Hibernating $ids"
    aws --profile dlittle ec2 stop-instances --hibernate --instance-ids $ids
}

# hotkeys for folder navigation in terminal
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

if [[ -f ${+HOME/.pushovervars} ]]; then
  source $HOME/.pushovervars
fi

bindkey -s '\eh' 'bdir\n'
bindkey -s '\ek' 'udir\n'
bindkey -s '\ej' 'idir\n'
bindkey -s '\el' 'fdir\n'
bindkey -s '\eg' 'hdir\n'
bindkey '\e;' autosuggest-accept

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

