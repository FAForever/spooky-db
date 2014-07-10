param (
    [string]$target = "d:\code\personal\html\unitdb\app\data\index.json",
    [string]$faUnitFile = "d:\games\steam\SteamApps\common\Supreme Commander Forged Alliance\gamedata\units.scd",
    [string]$fafFile = "c:\ProgramData\FAForever\gamedata\faforever.nxt"
)

Function Create-UnitIndex {
    param (
        [string]$unitDir
    )

    $blueprints = Get-ChildItem "$unitDir\**\*_unit.bp"
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

Function Run {
    param (
        [string]$target
    )

    $tempDir = "C:\Temp\!fafUnits"

    Write-Progress -Activity "Cleaning"
    If (Test-Path $tempDir) {
        Remove-Item -Recurse -Force $tempDir
    }

    Write-Progress -Activity "Extracting Forged Alliance units"
    7z x "$faUnitFile" -o"$tempDir"

    Write-Progress -Activity "Extracting FAF units"
    7z x "$fafFile" "units" -o"$tempDir" -y

    Write-Progress -Activity "Creating unit index"
    $json = Create-UnitIndex "$tempDir/units"
    $Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding($False)
    [System.IO.File]::WriteAllLines($target, $json, $Utf8NoBomEncoding)

    Write-Progress -Activity "Sorting"
    python sorter.py $target

    Write-Progress -Activity "Slenderizing"
    python slenderizer.py $target
}

Run $target
