#!/bin/bash

index()
{
    echo -n '['
    while [ "$#" -gt 0 ]; do
        lua ./blueprint2json.lua $1 2> /dev/null
        ok=$?
        shift

        [ $ok -eq 0 ] || continue
        [ "$#" -gt 1 ] && echo ,
    done
    echo ']'
}

if [ ! -d "$1" ]; then
    echo "Usage: $0 <directory>"
    exit 1
fi

index $1/**/*.bp | json_reformat
