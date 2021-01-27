param (
    [string] $rootCAName = "certificate-authority-for-local-testing",
    [string] $rootCACountry = "US"
)

Get-ChildItem cert:\CurrentUser\Root |
    Where-Object { $_.Subject -eq "CN=$rootCAName, C=$rootCACountry" } |
    Format-List
