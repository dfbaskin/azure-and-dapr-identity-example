. $(Join-Path $PSScriptRoot '../../../tools/ps/app-config.ps1')

$imageName = "users-api"
$imageVersion = Get-BuildVersion -yamlFile $(Join-Path $PSScriptRoot "users-api-deployment.yaml")
$imageFullName = "$($imageName):$($imageVersion)"

$imgIds = @(docker image ls $imageFullName -q)
if($imgIds.Length -gt 0) {
  docker image ls $imageName
  Write-Output @"

Image with version $imageVersion already exists.

Change the version in the file:

   - deploy/users-api-deployment.yaml

"@  
  exit 1
}

$buildPath = Join-Path $PSScriptRoot ".."
Push-Location $buildPath

if(Test-Path ./build/) {
  Remove-Item ./build/ -Force -Recurse
}

Write-Output "Building .NET application ..."
dotnet build --configuration Release
if(-not $?) {
  Pop-Location
  exit 1
}
dotnet publish --configuration Release --output ./build --no-build
if(-not $?) {
  Pop-Location
  exit 1
}

Write-Output "Building Image ..."
docker build -t $imageFullName -t "$($imageName):latest" .
if(-not $?) {
  Pop-Location
  exit 1
}

docker image ls $imageName
Pop-Location
