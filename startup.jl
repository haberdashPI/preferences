macro tryusing(mod, expr...)
    quote
        try
            using $mod
            $(expr...)
        catch e
            buffer = IOBuffer()
            print(buffer, "Exception while loading ")
            print(buffer, string($(QuoteNode(mod))))
            println(buffer, ": ")
            for (exc, bt) in Base.catch_stack()
                showerror(buffer, exc, bt)
                println(buffer)
            end
            @error String(take!(buffer))
        end
    end
end

@tryusing Revise

@static if isinteractive()
    @tryusing OhMyREPL enable_autocomplete_brackets(false)
    @tryusing Infiltrator

    # @static if gethostname() ∉ ["dlittle"]
    #     @tryusing Alert alert_REPL!(duration=5.0)
    # else
    #     @tryusing Alert begin
    #         using AlertPushover
    #         pushover_alert!(; token=ENV["MY_PUSHOVER_TOKEN"],
    #                         user=ENV["MY_USER_PUSHOVER_TOKEN"])
    #     end
    # end
end

function activate_from(file::String)
    parts = splitpath(dirname(file))
    dir = joinpath(parts...)
    while !isfile(joinpath(dir, "Project.toml")) &&
              !isfile(joinpath(dir, "JuliaProject.toml")) &&
              !ispath(joinpath(dir, ".git"))

        if isempty(dir)
            # if we found no project, assume dirname(file) is desired
            dir = dirname(file)

            break
        end
        parts = parts[1:(end-1)]
        # give up if there's nothing left
        if isempty(parts)
            dir = dirname(file)
            break
        end
        dir = joinpath(parts...)
    end
    Pkg.activate(dir)
    cd(dir)
    @info "Current directory is: $dir"
    return dir
end

function run_from(file::String)
    activate_from(file)
    include(file)
end

ENV["JULIA_PKG_USE_CLI_GIT"] = "true"

import Pkg
