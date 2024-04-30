param (
    # [string]$target = "d:\code\personal\unitdb\app",
    # [string]$faUnitFile = "d:\games\steam\SteamApps\common\Supreme Commander Forged Alliance\gamedata\units.scd",
    # [string]$fafFile = "c:\ProgramData\FAForever\gamedata\faforever.faf",
    # [string]$fafUnitsFile = "c:\ProgramData\FAForever\gamedata\units.nx2",
    # [string]$nomadsUnitsFile = "c:\ProgramData\FAForever\gamedata\units.nmd",
    # [string]$fafLuaFile = "c:\ProgramData\FAForever\gamedata\lua.nx2"

    [string]$target = "",
    [string]$inputUnits = "",
    [string]$inputLua = ""
)

$env:Path -split ';'

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

    Write-Progress -Activity "Creating unit index"
    $json = Create-UnitIndex "$inputUnits" "$inputLua/version.lua"
    $Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding($False)
    # [System.IO.File]::WriteAllLines("$target\data\index.json" , $json, $Utf8NoBomEncoding)
    Set-Content -Path "$target\data\index.json" -Value $json

    Write-Progress -Activity "Cleaning"
    python cleaner.py $target

    echo $json
}

echo $target
echo $inputUnits
echo $inputLua

Run $target
