param (
    [string] $rootCAName = "certificate-authority-for-local-testing",
    [string] $rootCACountry = "US"
)

# Note, this only works in Powershell 5 for Windows (not Powershell Core)

Get-ChildItem cert:\CurrentUser\Root |
    Where-Object { $_.Subject -eq "CN=$rootCAName, C=$rootCACountry" } |
    Format-List

Get-ChildItem cert:\CurrentUser\Root |
    Where-Object { $_.Subject -eq "CN=$rootCAName, C=$rootCACountry" } |
    Remove-Item
