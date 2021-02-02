. $(Join-Path $PSScriptRoot '../../tools/ps/app-config.ps1')

$namespace = Get-AppNamespace
$configFile = Join-Path $PSScriptRoot "frontend-ingress.yaml"
kubectl apply -f $configFile --namespace=$namespace
