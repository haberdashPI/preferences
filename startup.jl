if isinteractive()
    @eval using VimBindings
end

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

    @static if gethostname() ∉ ["dlittle"]
        @tryusing Alert alert_REPL!(duration=5.0)
    else
        @tryusing Alert begin
            using AlertPushover
            pushover_alert!(; token=ENV["MY_PUSHOVER_TOKEN"],
                            user=ENV["MY_USER_PUSHOVER_TOKEN"])
        end
    end
end

ENV["JULIA_PKG_USE_CLI_GIT"] = "true"

import Pkg

