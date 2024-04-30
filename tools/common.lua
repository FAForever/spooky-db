#!/usr/bin/lua

local common = {}

local os = require("os")
local io = require("io")

function common.usageHelper(runCmd, desc, msg)
    print(runCmd)
    print(desc)
    print()
    print(msg)
    os.exit(-1)
end

function common.readFile(file, errCallback)
    if file == nil then
        errCallback()
    end

    local handle = io.open(file)
    if not handle then
        error(string.format("Cannot open handle to %s", file))
        os.exit(-1)
        return
    end

    local file = handle:read("*a")
    if not file then
        error(string.format("Cannot read %s", file))
        os.exit(-1)
        return
    end

    return file
end

function common.load(str)
    f, err = loadstring(str)

    -- print parse errors
    if f == nil then
        print(err)
        os.exit(-1)
    end

    return f
end

return common
