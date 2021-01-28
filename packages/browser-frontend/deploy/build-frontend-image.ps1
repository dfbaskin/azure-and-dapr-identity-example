
$imageName = "frontend-webserver"

$imgIds = @(docker image ls $imageName -q)

if($imgIds.Length -gt 0) {
  Write-Output "Deleting previous image:"
  docker image ls $imageName
  $imgIds |
    ForEach-Object {
      $imgId = $_
      Write-Output "Deleting $imgId"
      docker image rm $imgId
      if(-not $?) {
        exit 1
      }
    }
}

Write-Output "Building Image ..."
$buildPath = Join-Path $PSScriptRoot ".."
Push-Location $buildPath
docker build -t $imageName .
$success = $?
Pop-Location

if($success) {
  docker image ls $imageName
}
