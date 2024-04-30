#!/usr/bin/lua

local cmn = require("common")

function usage(msg)
    cmn.usageHelper(
        string.format("Usage: %s path/to/version.lua", arg[0]),
        "Get FAForever version from version.lua",
        msg
    )
end

-- required to run GetVersion() from version file
function LOG(msg)
end

function GetVersion()
    return -1
end

function readError()
    usage("Missing argument")
end

versionFile = cmn.readFile(arg[1], readError)
versionFile = cmn.load(versionFile)
versionFile()

print(GetVersion())
