macro tryusing(mod,expr...)
    quote
        try
            using $mod
            $(expr...)
        catch e
            if hasproperty(e, :msg)
                @warn(e.msg)
            else
                @warn(string("Exception loading ",$(QuoteNode(mod)),": ",e))
            end
        end
    end
end

@tryusing OhMyREPL enable_autocomplete_brackets(true)
@tryusing Alert alertREPL(5.0)
@tryusing Revise