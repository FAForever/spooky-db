#!/bin/bash

index()
{
    echo -n '['
    while [ "$#" -gt 0 ]; do
        JSON=`lua ./blueprint2json.lua $1 2> /dev/null`
        ok=$?
        shift

        if [ $ok -ne 0 ]; then
            echo "FAIL: $1"
            exit 1
        fi

        echo $JSON | json_reformat
        [ "$#" -gt 1 ] && echo ,
    done
    echo ']'
}

if [ ! -d "$1" ]; then
    echo "Usage: $0 <directory>"
    exit 1
fi

index $1/**/*.bp
