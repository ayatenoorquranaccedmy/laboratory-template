# Script to push to multiple GitHub profiles
Write-Host "Starting push to multiple remotes..." -ForegroundColor Cyan

# Push to origin (first profile)
Write-Host ""
Write-Host "Pushing to origin (ayatenoorquranaccedmy)..." -ForegroundColor Yellow
git push origin master
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Successfully pushed to origin" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to push to origin" -ForegroundColor Red
}

# Push to origin2 (second profile)
Write-Host ""
Write-Host "Pushing to origin2 (saadmoin123)..." -ForegroundColor Yellow
git push origin2 master
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Successfully pushed to origin2" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to push to origin2" -ForegroundColor Red
}

Write-Host ""
Write-Host "Done!" -ForegroundColor Cyan

