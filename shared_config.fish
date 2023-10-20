export PATH="$PATH:$HOME/.local/bin"
export PATH="$PATH:/opt/homebrew/bin"

if status is-interactive
  fish_vi_key_bindings
end

starship init fish | source

export JULIA_PKG_DEVDIR="{$HOME}/Documents/tools"

function ll; exa --long --group-directories-first $argv; end
function ls; exa $argv; end
export EC2_INSTANCE_ID=i-08c11ad6928e88948

function aws-start-pet; aws ec2 start-instances --instance-ids $EC2_INSTANCE_ID --profile pet; end
function aws-stop-pet; aws ec2 stop-instances --instance-ids $EC2_INSTANCE_ID --profile pet; end
function aws-sleep-pet-force; aws ec2 stop-instances --instance-ids $EC2_INSTANCE_ID --profile pet --hibernate; end
function aws-restart-pet; aws ec2 reboot-instances --instance-ids $EC2_INSTANCE_ID --profile pet; end
function aws-pet-status; aws ec2 describe-instance-status --instance-ids $EC2_INSTANCE_ID --profile pet | jq '.InstanceStatuses[0].InstanceState.Name'; end
function aws-get-instance-type; aws --profile pet ec2 describe-instances --filters Name=tag:Name,Values=dlittle-pet-instance --query 'Reservations[0].Instances[0].InstanceType' --output text; end
function awsp
    if test (count $argv) -lt 1
        set -l prof (aws configure list-profiles | fzf --height=20%) 
        export AWS_DEFAULT_PROFILE=$prof
        export AWS_PROFILE=$prof
    else
        export AWS_DEFAULT_PROFILE=$argv[1]
        export AWS_PROFILE=$argv[1]
    end
end

function aws-set-instance-type
  set -l instance (echo "t3.xlarge\nr6a.xlarge\nbr6a.2xlarge\nr5.xlarge\nm5a.2xlarge\nm6a.2xlarge\ng4dn.xlarge" | fzf)
  bash -c "source {$HOME}/Documents/preferences/change_ec2_instance_type.sh; AWS_PROFILE=pet change_ec2_instance_type -vfr -i {$EC2_INSTANCE_ID} -t {$instance}"
end

function jlfmt
    if test (count $argv) -lt 1
      julia --startup-file=no --project=@format -e "using JuliaFormatter; format(\".\", YASStyle())"
    else
      julia --startup-file=no --project=@format -e "using JuliaFormatter; format(\"{$argv[1]}\", YASStyle())"
    end
end

function pluto
  julia --project=@pluto -e 'using Pluto; Pluto.run(; auto_reload_from_file=true)'
end

function beacon-jl-templates
  julia --project=@templates -e 'using BeaconPkgTemplates; prompt_new_beacon_package()'
end

# hotkeys for folder navigation in terminal
function hdir
  pushd ~
  exa --long --group-directories-first
end
function udir
  pushd ..
  exa --long --group-directories-first
end
function bdir
  popd
  exa --long --group-directories-first
end
function idir
  pushd (fd -t d -d 1 | fzf) && exa --long --group-directories-first
end
function fdir
  pushd (fd -t d -d 8 | fzf) && exa --long --group-directories-first
end

if test -f "{$HOME}/.pushovervars"
  source $HOME/.pushovervars
end

bind -M insert \eh 'bdir; commandline -f repaint'
bind -M insert \ek 'udir; commandline -f repaint'
bind -M insert \ej 'idir; commandline -f repaint'
bind -M insert \el 'fdir; commandline -f repaint'
bind -M insert \eg 'hdir; commandline -f repaint'
# bind -M insert \e; accept-autosuggestion

export MANPAGER="sh -c 'col -bx | bat -l man -p'"
export FZF_DEFAULT_OPTS='--bind tab:down --cycle'
export EDITOR="code -w"

# Set the default profile. Avoid setting the profile when `aws-vault` is used as it interferes with the server mode
if test (uname) = Darwin
  if test -z "$AWS_VAULT"
    export AWS_PROFILE=dlittle
  end

  # OPTIONAL: Set some defaults for all profiles. The AWS CLI profile does not inherit any config 
  # settings from the `source_profile` or the `[default]` profile.
  # https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html#envvars-list
  export AWS_DEFAULT_REGION="us-east-2"
  export AWS_DEFAULT_OUTPUT="json"  # Available formats: https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-output-format.html
  export AWS_PAGER=""  # Disable use of a pager
end