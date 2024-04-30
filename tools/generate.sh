#!/bin/bash

# Parameters
target=""
inputUnits="$1"
inputLua="$2"

# Function to create unit index
create_unit_index() {
    local unitDir="$1"
    local luaVersionFile="$2"

    version=$(lua getVersion.lua "$luaVersionFile")

    echo '{'
    echo "\"version\": \"$version\","

    echo '"units": ['
    count=1
    total=$(find "$unitDir" -name "*_unit.bp" | wc -l)
    find "$unitDir" -name "*_unit.bp" -print0 | while IFS= read -r -d '' file; do
        base=$(basename "$file")
        echo "Parsing $base ($count/$total)"

        lua blueprint2json.lua "$file"

        if [ $count -lt $total ]; then
            echo ','
        fi

        count=$((count + 1))
    done
    echo ']'

    echo '}'
}

echo "Creating unit index"
json=$(create_unit_index "$inputUnits" "$inputLua/version.lua")
echo "$json" >"../app/data/index.json"

echo "Cleaning"
python cleaner.py
