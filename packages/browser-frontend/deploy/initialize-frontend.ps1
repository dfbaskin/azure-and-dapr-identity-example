param (
    [string] $namespace = 'azure-dapr-identity-example'
)

$configFile = Join-Path $PSScriptRoot "frontend-deployment.yaml"
kubectl apply -f $configFile --namespace=$namespace
