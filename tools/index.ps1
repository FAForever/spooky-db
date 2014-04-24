param (
    [string]$unitDir = "C:\Temp\!faforever",
    [string]$target = "C:\Temp\index.json"
)

Function Create-UnitIndex {
    param (
        [string]$unitDir
    )

    $blueprints = Get-ChildItem "$unitDir\**\*.bp"
    $count = 1
    $total = $blueprints.Count

    echo '['
    $blueprints | Foreach-Object {
        $file = $_.BaseName
        Write-Progress -Activity "Parsing $file" -Status "($count/$total)"

        lua blueprint2json.lua $_.FullName
        if ($count -lt $total) {
            echo ','
        }

        $count++
    }
    echo ']'
}

$json = Create-UnitIndex $unitDir
$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding($False)
[System.IO.File]::WriteAllLines($target, $json, $Utf8NoBomEncoding)


Write-Progress -Activity "Sorting"
python sorter.py $target
