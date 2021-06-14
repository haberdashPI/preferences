
if [[ $OSTYPE == "linux-gnu"* ]]; then
    # various programs
    export DEBUG_FRONTEND=noninteractive
    sudo apt -yq install gpg # requried for asdf nodejs
    sudo apt -yq install openjdk-11-jre # required fro VSCode package LTeX
    sudo apt -yq install prometheus-node-exporter # requested by @soulshake for beacon infra
    sudo apt -yq install exa # improved ls
    sudo apt -yq install tmux # essention remote work tool
    sudo apt -yq install neovim # cli editor of choice
    sudo apt -yq install myrepos # git multi-repo management

    yes | /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> /home/ubuntu/.zprofile
    eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
    sudo apt-get install build-essential
    brew install bat # modern `less` alternative
    brew install asdf # manages language environments
    brew install fd # modern `find` alternative
    brew install gh # git hub CLI

    # Oh My ZSH and plugins
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" --unattended
    { echo 'if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi\n'; cat ~/.zshrc; } > ~/.zshrc.new
    sed -i 's/ZSH_THEME=".*"/ZSH_THEME="powerlevel10k\/powerlevel10k"/g' ~/.zshrc.new
    sed -i '/^source .*oh-my-zsh.sh/i source $HOME\/Documents\/preferences\/zshrc_shared.sh' ~/.zshrc.new
    echo "[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh" >> ~/.zshrc.new

    git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
    git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
    git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
    cp ~/Documents/preferences/p10k.zsh ~/.p10k.zsh

    # TMUX
    git clone https://github.com/gpakosz/.tmux.git
    ln -s -f .tmux/.tmux.conf
    ln -s ~/Documents/preferences/tmux.conf.local .tmux.conf.local

    # neo vim
    mkdir -p ~/.conf/nvim
    ln -s ~/.conf/nvim/init.vim ~/Documents/preferences/vimrc
    sh -c 'curl -fLo "${XDG_DATA_HOME:-$HOME/.local/share}"/nvim/site/autoload/plug.vim --create-dirs \
       https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
    nvim +'PlugInstall --sync' +qa

    # setup 
else
    echo "OS Not supported"
fi