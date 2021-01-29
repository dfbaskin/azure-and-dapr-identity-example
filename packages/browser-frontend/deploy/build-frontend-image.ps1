
$imageName = "frontend-webserver"
$imageVersion = "v1.3"
$imageFullName = "$($imageName):$($imageVersion)"


$imgIds = @(docker image ls $imageFullName -q)
if($imgIds.Length -gt 0) {
  docker image ls $imageName
  Write-Output @"

Image with version $imageVersion already exists.

Change the version in the files:

   - deploy/build-frontend-image.ps1
   - deploy/frontend-deployment.yaml

"@  
  exit 1
}

Write-Output "Building Image ..."
$buildPath = Join-Path $PSScriptRoot ".."
Push-Location $buildPath
docker build -t $imageFullName -t "$($imageName):latest" .
$success = $?
Pop-Location

if($success) {
  docker image ls $imageName
}
