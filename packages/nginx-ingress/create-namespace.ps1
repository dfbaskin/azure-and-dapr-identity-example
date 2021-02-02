. $(Join-Path $PSScriptRoot '../../tools/ps/app-config.ps1')

$namespace = Get-AppNamespace
kubectl create ns $namespace
