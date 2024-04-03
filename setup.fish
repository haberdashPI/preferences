
if test (uname) = Linux
    # various programs
    export DEBUG_FRONTEND=noninteractive
    sudo apt -yq install prometheus-node-exporter # requested by @soulshake for beacon infra
    sudo apt -yq install fzf # fuzy completion tool
    sudo apt -yq install jq # json parsing
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    rustup update
    cargo install --locked zellij # terminal multiplexer
    sudo add-apt-repository ppa:maveonair/helix-editor
    sudo apt -yq update
    sudo apt -yq install helix # text editor

    yes | /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> /home/ubuntu/.zprofile
    eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
    sudo apt-get install build-essential
    brew install bat # modern `less` alternative
    brew install dust # modern `du` alternative
    brew install tldr # summarizes commands (shorter than `man`)
    brew install exa # modern `ls` alternative
    brew install fd # modern `find` alternative
    brew install gh # git hub CLI
    brew install dust # modrern disk usage tool
    brew install starship # command prompt

    # zellij copy/paste configuration (makes copy/paste on remote VSCode sessions possible)
    ln -s ~/Documents/preferences/zj.config.kdl ~/.config/zellij/config.kdl
else if test (uname) = Darwin
    yes | /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    brew install gpg
    brew install zellij
    brew install helix
    brew install fzf
    brew install bat
    brew install dust
    brew install tldr
    brew install exa
    brew install fd
    brew install gh
    brew install jq
    brew install koekeishiya/formulae/skhd
    brew install koekeishiya/formulae/yabai
    brew tap homebrew/cask-fonts
    brew install --cask font-sauce-code-pro-nerd-font
    brew install starship
    bash <(curl -s https://raw.githubusercontent.com/dbalatero/VimMode.spoon/master/bin/installer)
else
    echo "OS Not supported"
    exit 1
end

curl -sL https://raw.githubusercontent.com/jorgebucaran/fisher/main/functions/fisher.fish | source && fisher install jorgebucaran/fisher
fisher install patrickf1/fzf.fish
fisher install jethrokuan/z
fisher install jorgebucaran/nvm.fish
fisher install kpbaks/zellij.fish
echo "source ~/Documents/preferences/shared_config.fish" >> ~/.config/fish/config.fish

# helix config
ln -s ~/Documents/preferences/hx.config.toml ~/.config/helix/config.toml
ln -s ~/Documents/preferences/hx.languages.toml ~/.config/helix/languages.toml

# git setup
echo "[user]" >> ~/.gitconfig
echo "    name = \"David F Little\"" >> ~/.gitconfig
echo "    email = david.frank.little@gmail.com" >> ~/.gitconfig

# julia setup
curl -fsSL https://install.julialang.org | sh
juliaup add release
juliaup add 1.9
juliaup default release
julia -e 'using Pkg; Pkg.add(["VimBindings", "Revise", "Infiltrator"])'
mkdir -p ~/.julia/config
ln -s ~/Documents/preferences/startup.jl ~/.julia/config/startup.jl
