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

    print(io)
    print(file)

    local f = io.open(file):read("*a")

    if f == nil then
        print(string.format("Cannot read %s", file))
        os.exit(-1)
    end

    return f
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
