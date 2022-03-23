#! /usr/bin/zsh
source ~/.zshrc
julia "${@[1,-2]:q}" ${@[-1]}