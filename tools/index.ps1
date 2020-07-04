param (
    [string]$target = "d:\code\personal\unitdb\app",
    [string]$faUnitFile = "d:\games\steam\SteamApps\common\Supreme Commander Forged Alliance\gamedata\units.scd",
    [string]$fafFile = "c:\ProgramData\FAForever\gamedata\faforever.faf",
    [string]$fafUnitsFile = "c:\ProgramData\FAForever\gamedata\units.nx2",
    [string]$nomadsUnitsFile = "c:\ProgramData\FAForever\gamedata\units.nmd",
    [string]$fafLuaFile = "c:\ProgramData\FAForever\gamedata\lua.nx2"
)

Function Create-UnitIndex {
    param (
        [string]$unitDir,
        [string]$luaVersionFile
    )

    $version = lua getVersion.lua "$luaVersionFile"

    echo '{'
    echo "`"version`": `"$version`","

    $blueprints = Get-ChildItem "$unitDir\**\*_unit.bp"
    $count = 1
    $total = $blueprints.Count

    echo '"units": '
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

    echo '}'
}

Function Run {
    param (
        [string]$target
    )

    $tempDir = "C:\Temp\!fafUnits"

    Write-Progress -Activity "Cleaning unit dir"
    If (Test-Path $tempDir) {
        Remove-Item -Recurse -Force $tempDir
    }

    Write-Progress -Activity "Extracting Forged Alliance units"
    7z x "$faUnitFile" -o"$tempDir"

    Write-Progress -Activity "Extracting FAF units 1/2"
    7z x "$fafFile" "units" -o"$tempDir" -y

    Write-Progress -Activity "Extracting FAF units 2/2"
    7z x "$fafUnitsFile" "units" -o"$tempDir" -y
    
    Write-Progress -Activity "Extracting Nomads units"
    7z x "$fafUnitsFile" "units" -o"$tempDir" -y

    Write-Progress -Activity "Extracting FAF lua"
    7z e "$fafLuaFile" "lua/version.lua" -o"$tempDir" -y

    Write-Progress -Activity "Creating unit index"
    $json = Create-UnitIndex "$tempDir/units" "$tempDir/version.lua"
    $Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding($False)
    [System.IO.File]::WriteAllLines("$target\data\index.json" , $json, $Utf8NoBomEncoding)

    Write-Progress -Activity "Cleaning"
    python cleaner.py $target
}

Run $target
