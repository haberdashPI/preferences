#!/bin/bash

export "`tmux showenv PATH`"
export "`tmux showenv GIT_ASKPASS`"
export "`tmux showenv VSCODE_GIT_ASKPASS_MAIN`"
export "`tmux showenv VSCODE_GIT_ASKPASS_NODE`"
export "`tmux showenv VSCODE_IPC_HOOK_CLI`"