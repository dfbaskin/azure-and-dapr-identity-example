
function Get-AppConfig
{
  return Get-Content @(Join-Path $PSScriptRoot ".." ".." "app-config.json") |
    ConvertFrom-Json
}

function Get-AppNamespace
{
  return $(Get-AppConfig).deployment.namespace
}
