param (
    [string] $key = '123abc',
    [string] $openSSL = 'C:\Program Files\git\usr\bin\openssl.exe',
    [string] $rootCAName = "certificate-authority-for-local-testing",
    [string] $rootCACountry = "US"
)

# Change directory to the "certs" path.
$certPath = New-Item -ItemType Directory -Force -Path @(Join-Path $PSScriptRoot "../../certs") |
    Select-Object -ExpandProperty FullName
Push-Location $certPath

# Generate a new root certificate
& $openSSL req `
    -x509 -nodes `
    -new -sha256 -days 1024 `
    -newkey rsa:4096 `
    -keyout root-ca.key `
    -out root-ca.pem `
    -passout "pass:$key" `
    -subj "/C=$rootCACountry/CN=$rootCAName"

& $openSSL x509 `
    -outform pem `
    -in root-ca.pem `
    -out root-ca.crt

Import-Certificate -FilePath .\root-ca.crt -CertStoreLocation cert:\CurrentUser\Root
Get-ChildItem cert:\CurrentUser\Root |
    Where-Object { $_.Subject -eq "CN=$rootCAName, C=$rootCACountry" } |
    ForEach-Object {
        $_.FriendlyName = "**UNTRUSTED** Certificate Authority for Local Testing"
    }

Get-ChildItem cert:\CurrentUser\Root |
    Where-Object { $_.Subject -eq "CN=$rootCAName, C=$rootCACountry" } |
    Format-List

# Generate the testing.local SSL certificate
@"
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage=digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName=@alt_names
[alt_names]
DNS.1 = testing.local
"@ | Set-Content -Path testing-local.ext
    
& $openSSL req `
    -new -nodes -newkey rsa:4096 `
    -keyout testing-local.key `
    -out testing-local.csr `
    -subj "/C=$rootCACountry/O=local-testing-certificates/CN=testing.local"

& $openSSL x509 `
    -req -sha256 -days 1024 `
    -in testing-local.csr `
    -CA root-ca.pem `
    -CAkey root-ca.key `
    -CAcreateserial `
    -extfile testing-local.ext `
    -out testing-local.crt `
    -passin "pass:$key"

Write-Output "Be sure to add `"127.0.0.1 testing.local`" to your local hosts file."

Pop-Location
