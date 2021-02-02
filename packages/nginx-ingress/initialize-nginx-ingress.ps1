. $(Join-Path $PSScriptRoot '../../tools/ps/app-config.ps1')

$namespace = Get-AppNamespace

function LoadCertificate {
    param (
        [string] $fileName
    )

    $fullName = Resolve-Path @(Join-Path $PSScriptRoot "../../certs" $fileName) |
        Select-Object -ExpandProperty Path
    $content = Get-Content $fullName |
        Where-Object { -not [string]::IsNullOrWhiteSpace($_) } |
        Join-String -Separator "`n"
    return [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($content))
}

$buildPath = New-Item -ItemType Directory -Force -Path @(Join-Path $PSScriptRoot "./build") |
    Select-Object -ExpandProperty FullName

$certContent = LoadCertificate "testing-local.crt"
$keyContent = LoadCertificate "testing-local.key"

$content = Get-Content -Path @(Join-Path $PSScriptRoot "ingress-config-template.yaml")
$content = $content -replace '\$CERT_VALUE', $certContent
$content = $content -replace '\$KEY_VALUE', $keyContent

$configFile = Join-Path $buildPath "ingress-config.yaml"
Set-Content -Path $configFile $content

helm install example-app-ingress nginx-stable/nginx-ingress -n $namespace -f $configFile

kubectl apply -f @(Join-Path $PSScriptRoot "ingress-master.yaml") -n $namespace
