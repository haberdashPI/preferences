#! /usr/bin/zsh

export ZSH="/home/ubuntu/.oh-my-zsh"
source $HOME/Documents/preferences/zshrc_shared.sh

julia_exec=`/home/linuxbrew/.linuxbrew/bin/asdf env julia which julia`
$julia_exec "${@[1,-2]:q}" ${@[-1]}