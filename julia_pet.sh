#! /usr/bin/zsh

source ~/.zshrc
julia_exec=`/home/ubuntu/.linuxbrew/bin/asdf env julia which julia`
$julia_exec "${@[1,-2]:q}" ${@[-1]}