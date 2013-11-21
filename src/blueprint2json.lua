#!/usr/bin/lua

local os = require("os")
local io = require("io")
local json = require("json")

if arg[1] == nil then
    print(string.format("Usage: %s <file>.bp", arg[0]))
    print("Parse Supreme Commander blueprint file and dump it as JSON")
    os.exit(-1)
end

function UnitBlueprint(table)
    return table
end

function Sound(table)
    return table
end

function stripLoc(x)
    if type(x) == "table" then
        local r = {}
        for key, value in pairs(x) do
            r[key] = stripLoc(value)
        end
        return r
    end

    if type(x) == "string" then
        return x:match "^<LOC.*>(.*)$" or x
    end

    return x
end

local blueprint = loadstring("return " .. io.open(arg[1]):read("*a"))()

if blueprint == nil then
    return 1
end

print(json.encode(stripLoc(blueprint)))
