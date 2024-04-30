#!/usr/bin/lua

local json = require("dkjson")

local cmn = require("common")

function usage(msg)
    cmn.usageHelper(
        string.format("Usage: %s <file>.bp", arg[0]),
        "Parse Supreme Commander blueprint file and dump it as JSON",
        msg
    )
end

-- this is the main function that's called in
-- blueprint code
function UnitBlueprint(table)
    return table
end

-- this is a function used in some blueprints,
-- we need it in order to evaluate blueprint code
function Sound(table)
    return table
end

function MeshBlueprint(table)
    return table
end

-- strip '<LOC...>' prefixes found in some string
-- values
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

function readError()
    usage(string.format("Cannot read %s", arg[1]))
end

local blueprint = cmn.readFile(arg[1], readError)

-- for some reason, blueprints use different comment
-- syntax than Lua
blueprint = blueprint:gsub('#','--')

blueprint = cmn.load("return " .. blueprint)

-- evaluate the blueprint and add "Id" key to it
blueprint = blueprint()
blueprint["Id"] = arg[1]:match "^.*[/\\]([A-Z0-9]+).*.bp$"

print(json.encode(stripLoc(blueprint)))
