#!/usr/bin/lua

local os = require("os")
local io = require("io")
local json = require("json")

function usage(msg)
    print(string.format("Usage: %s <file>.bp", arg[0]))
    print("Parse Supreme Commander blueprint file and dump it as JSON")
    print()
    print(msg)
    os.exit(-1)
end

if arg[1] == nil then
    usage("Missing argument")
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

local blueprint = io.open(arg[1]):read("*a")

if blueprint == nil then
    usage(string.format("Cannot read %s", arg[1]))
end

-- for some reason, blueprints use different comment
-- syntax than Lua
blueprint = blueprint:gsub('#','--')

blueprint, err = loadstring("return " .. blueprint)

-- print parse errors
if blueprint == nil then
    print(err)
    os.exit(-1)
end

-- evaluate the blueprint and add "Id" key to it
blueprint = blueprint()
blueprint["Id"] = arg[1]:match "^.*/([A-Z0-9]+).*\\.bp$"

print(json.encode(stripLoc(blueprint)))
