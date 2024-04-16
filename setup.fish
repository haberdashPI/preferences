
if test (uname) = Linux
    # various programs
    export DEBUG_FRONTEND=noninteractive
    sudo apt -yq install prometheus-node-exporter # requested by @soulshake for beacon infra
    sudo apt -yq install fzf # fuzy completion tool
    sudo apt -yq install jq # json parsing
    mkdir ~/.config/fish/conf.d
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs > ./rust.install.sh
    yes '1' | sh ./rust.install.sh
    source "$HOME/.cargo/env.fish"
    rustup update
    cargo install --locked zellij # terminal multiplexer
    cargo install --locked bat
    cargo install --locked du-dust
    cargo install --locked exa
    cargo install --git https://github.com/bnprks/mcfly-fzf
    curl -sS https://starship.rs/install.sh | sudo sh
    ln -s ~/Documents/preferences/starship.toml ~/.config/starship.toml

    yes | sudo add-apt-repository ppa:maveonair/helix-editor
    sudo apt -yq update
    sudo apt -yq install fd-find
    sudo apt -yq install helix # text editor

    curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh > ./install.sh
    yes | /bin/bash ./install.sh
    rm ./install.sh
    /home/linuxbrew/.linuxbrew/bin/brew shellenv >> /home/ubuntu/.config/fish/config.fish
    sudo apt-get install build-essential
    brew install mcfly
    brew install gh # git hub CLI

    # zellij copy/paste configuration (makes copy/paste on remote VSCode sessions possible)
    mkdir -p ~/.config/zellij/
    ln -s ~/Documents/preferences/zj.config.kdl ~/.config/zellij/config.kdl
else if test (uname) = Darwin
    curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh > ./install.sh
    yes | /bin/bash ./install.sh
    rm ./install.sh
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
    brew install mcfly
    bash <(curl -s https://raw.githubusercontent.com/dbalatero/VimMode.spoon/master/bin/installer)
    cargo install --git https://github.com/bnprks/mcfly-fzf
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
source ~/.config/fish/config.fish

# # install tldr tool
# nvm install latest
# nvm use latest
# npm install -g tldr

# helix config
mkdir -p ~/.config/helix/
ln -s ~/Documents/preferences/hx.config.toml ~/.config/helix/config.toml
ln -s ~/Documents/preferences/hx.languages.toml ~/.config/helix/languages.toml

# git setup
echo "[user]" >> ~/.gitconfig
echo "    name = \"David F Little\"" >> ~/.gitconfig
echo "    email = david.frank.little@gmail.com" >> ~/.gitconfig

# julia setup
curl -fsSL https://install.julialang.org | sh
fish_add_path $HOME/.juliaup/bin
juliaup add release
juliaup add 1.9
juliaup default release
julia -e 'using Pkg; Pkg.add(["VimBindings", "Revise", "Infiltrator"])'
mkdir -p ~/.julia/config
ln -s ~/Documents/preferences/startup.jl ~/.julia/config/startup.jl
