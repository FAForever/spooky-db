#!/bin/bash

TMPFILE=`mktemp -q /tmp/blueprint2json.XXXXXX`
trap 'rm $TMPFILE' EXIT

index()
{
    echo -n '['
    while [ "$#" -gt 0 ]; do
        JSON=`lua ./blueprint2json.lua $1 2> $TMPFILE`
        ok=$?
        shift

        if [ $ok -ne 0 ]; then
            echo "FAIL: $1"
            cat $TMPFILE
            exit 1
        fi

        echo $JSON | json_reformat
        [ "$#" -gt 0 ] && echo ,
    done
    echo ']'
}

if [ ! -d "$1" ]; then
    echo "Usage: $0 <directory>"
    exit 1
fi

index $1/**/*.bp
