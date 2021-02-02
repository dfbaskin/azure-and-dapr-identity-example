. $(Join-Path $PSScriptRoot '../../../tools/ps/app-config.ps1')

$imageName = "frontend-webserver"
$imageVersion = Get-BuildVersion -yamlFile $(Join-Path $PSScriptRoot "frontend-deployment.yaml")
$imageFullName = "$($imageName):$($imageVersion)"

$imgIds = @(docker image ls $imageFullName -q)
if($imgIds.Length -gt 0) {
  docker image ls $imageName
  Write-Output @"

Image with version $imageVersion already exists.

Change the version in the file:

   - deploy/frontend-deployment.yaml

"@  
  exit 1
}

$buildPath = Join-Path $PSScriptRoot ".."
Push-Location $buildPath

Write-Output "Building React application ..."
npm run build
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
