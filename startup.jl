macro tryusing(mod,expr...)
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

@tryusing OhMyREPL enable_autocomplete_brackets(true)
@tryusing Revise

@static if gethostname() != "edgewater"
    @tryusing Alert alertREPL(5.0)
else
    @tryusing Alert begin
        using AlertPushover
        pushover_alert!(token = ENV["MY_PUSHOVER_TOKEN"], user = ENV["MY_USER_PUSHOVER_TOKEN"])
    end
end