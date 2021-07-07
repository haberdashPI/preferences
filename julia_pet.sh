#! /usr/bin/zsh
# new-session -A -s $1

source ~/.zshrc
julia_exec=`/home/ubuntu/.linuxbrew/bin/asdf env julia which julia`
# echo $julia_exec
# if [[ -z $VSCODE_WORKSPACE_NAME ]]; then
#     name="vscode-workspace"
# else
#     name=$VSCODE_WORKSPACE_NAME
# fi
# echo $julia_exec
# echo $@
# bash
$julia_exec "${@[1,-2]:q}" ${@[-1]}
# tmux new-session -A -s $name $julia_exec $@