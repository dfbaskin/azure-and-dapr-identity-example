. $(Join-Path $PSScriptRoot '../../../tools/ps/app-config.ps1')

$namespace = Get-AppNamespace
$configFile = Join-Path $PSScriptRoot "users-api-deployment.yaml"
kubectl apply -f $configFile --namespace=$namespace
