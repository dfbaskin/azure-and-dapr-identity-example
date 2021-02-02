
function Get-AppConfig
{
  return Get-Content @(Join-Path $PSScriptRoot ".." ".." "app-config.json") |
    ConvertFrom-Json
}

function Get-AppNamespace
{
  return $(Get-AppConfig).deployment.namespace
}

function Get-BuildVersion
{
    param (
      [string] $yamlFile
    )

    $text = $(
      Get-Content $yamlFile |
      Select-String "^\s+image\:\s+" |
      Select-Object -ExpandProperty Line
    )

    return $text.split(":")[2];
}
