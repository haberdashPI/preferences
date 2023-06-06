
if [[ $OSTYPE == "linux-gnu"* ]]; then
    # various programs
    export DEBUG_FRONTEND=noninteractive
    sudo apt -yq install gpg # requried for asdf nodejs
    sudo apt -yq install openjdk-11-jre # required fro VSCode package LTeX
    sudo apt -yq install prometheus-node-exporter # requested by @soulshake for beacon infra
    sudo apt -yq install tmux # essention remote work tool
    sudo apt -yq install neovim # cli editor of choice
    sudo apt -yq install myrepos # git multi-repo management
    sudo apt -yq install fzf # git multi-repo management
    sudo apt -yq install jq # julia_pod depedency

    yes | /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> /home/ubuntu/.zprofile
    eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
    sudo apt-get install build-essential
    brew install bat # modern `less` alternative
    brew install dust # modern `du` alternative
    brew install tldr # summarizes commands (shorter than `man`)
    brew install exa # modern `ls` alternative
    brew install asdf # manages language environments
    brew install fd # modern `find` alternative
    brew install gh # git hub CLI
    brew install dust
elif [[ $OSTYPE == "darwin"* ]]; then
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
    brew install asdf 
    brew install fd 
    brew install gh    
    brew install jq
    brew install koekeishiya/formulae/skhd
    brew install koekeishiya/formulae/yabai
    brew install dust
    brew tap homebrew/cask-fonts
    brew install --cask font-sauce-code-pro-nerd-font
    bash <(curl -s https://raw.githubusercontent.com/dbalatero/VimMode.spoon/master/bin/installer)
else
    echo "OS Not supported"
    exit 1
fi

# Oh My ZSH and plugins
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" --unattended

# p10k theme
{ echo 'if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"; fi'; cat ~/.zshrc; } > ~/.zshrc.new
sed -i 's/ZSH_THEME=".*"/ZSH_THEME="powerlevel10k\/powerlevel10k"/g' ~/.zshrc.new
echo "[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh" >> ~/.zshrc.new

# julia install (override beacon defaults)
if [[ $HOST == "dlittle" ]]; then
    # julia_pod setup
    git clone https://github.com/beacon-biosignals/julia_pod ~/bin/julia_pod
    asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git 
    asdf install nodejs latest
    asdf global nodejs latest
    asdf reshim
    npm i -g devspace
    sudo apt -yq install jq # julia_pod depedency
    
    echo "
    # julia_pod setup
    export PATH=\$PATH:$HOME/bin/julia_pod/add_me_to_your_PATH
    export DOCKER_BUILDKIT=1 
    export DOCKER_CLI_EXPERIMENTAL=enabled
    export PRIVATE_REGISTRY_URL=\"https://github.com/beacon-biosignals/BeaconRegistry.git\"
    export GITHUB_TOKEN_FILE=$HOME/.julia_pod_pat
    " >> ~/.zshrc.new
fi

cp ~/Documents/preferences/p10k.zsh ~/.p10k.zsh

# ZSH config common across all my machines
sed -i '/^source .*oh-my-zsh.sh/c source $HOME\/Documents\/preferences\/zshrc_shared.sh' ~/.zshrc.new

# plugins
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
git clone https://github.com/jeffreytse/zsh-vi-mode $ZSH/custom/plugins/zsh-vi-mode

# move over the new zshrc file
rm ~/.zshrc
cp ~/.zshrc.new ~/.zshrc

# TMUX
git clone https://github.com/gpakosz/.tmux.git
ln -s -f .tmux/.tmux.conf
ln -s ~/Documents/preferences/tmux.conf.local .tmux.conf.local
ln -s ~/Documents/preferences/ssh_rc ~/.ssh/rc

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
brew install juliaup
juliaup add release
juliaup default release
julia -e 'using Pkg; Pkg.add(["OhMyREPL", "Revise", "TerminalPager", "Alert", "AlertPushover"])'
mkdir -p ~/.julia/config
ln -s ~/Documents/preferences/startup.jl ~/.julia/config/startup.jl
