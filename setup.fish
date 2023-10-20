
if test (uname) = Linux
    # various programs
    export DEBUG_FRONTEND=noninteractive
    sudo apt -yq install prometheus-node-exporter # requested by @soulshake for beacon infra
    sudo apt -yq install tmux # essention remote work tool
    sudo apt -yq install neovim # cli editor of choice
    sudo apt -yq install fzf # fuzy completion tool
    sudo apt -yq install jq # json parsing

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
    brew install dust # mordern disk usage tool
    brew install nvm # node version manager
    brew install starship # command prompt
else if test (uname) = Darwin
    yes | /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    brew install gpg 
    brew install tmux 
    brew install neovim 
    brew install myrepos 
    brew install fzf 
    brew install bat 
    brew install dust 
    brew install tldr 
    brew install exa 
    brew install nvm
    brew install fd 
    brew install gh    
    brew install jq
    brew install koekeishiya/formulae/skhd
    brew install koekeishiya/formulae/yabai
    brew install dust
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
echo "source ~/Documents/preferences/shared_config.fish" >> ~/.config/fish/config.fish

# TMUX
git clone https://github.com/gpakosz/.tmux.git
ln -s -f .tmux/.tmux.conf
ln -s ~/Documents/preferences/tmux.conf.local .tmux.conf.local

# neo vim
mkdir -p ~/.config/nvim
ln -s ~/Documents/preferences/vimrc ~/.config/nvim/init.vim
sh -c 'curl -fLo "${XDG_DATA_HOME:-$HOME/.local/share}"/nvim/site/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
nvim --headless +silent +PlugInstall +qall

# git setup
echo "[user]" >> ~/.gitconfig
echo "    name = \"David F Little\"" >> ~/.gitconfig
echo "    email = david.frank.little@gmail.com" >> ~/.gitconfig

# julia setup
curl -fsSL https://install.julialang.org | sh
juliaup add release
juliaup default release
julia -e 'using Pkg; Pkg.add(["OhMyREPL", "Revise", "VimBindings", "Alert", "AlertPushover", "Infiltrator"])'
mkdir -p ~/.julia/config
ln -s ~/Documents/preferences/startup.jl ~/.julia/config/startup.jl
