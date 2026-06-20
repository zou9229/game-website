param(
  [string]$WorkerName = "questcodes",
  [string]$DbName = "questcodes",
  [string]$Domain = "questcodes.com",
  [switch]$SkipSecret,
  [switch]$SkipMigrations
)

$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

$Wrangler = Join-Path $Root "node_modules\.bin\wrangler.CMD"
$DrizzleKit = Join-Path $Root "node_modules\.bin\drizzle-kit.CMD"

if (!(Test-Path $Wrangler)) {
  throw "Wrangler not found at $Wrangler. Run pnpm install first."
}

Write-Host "Checking Cloudflare login..."
& $Wrangler whoami

if (!(Test-Path "drizzle\meta\_journal.json")) {
  Write-Host "Generating SQLite/D1 migration..."
  $env:DATABASE_PROVIDER = "sqlite"
  $env:DATABASE_URL = "file:data/local.db"
  & $DrizzleKit generate --config=drizzle.config.ts
}

$dbId = $null

try {
  $listJson = & $Wrangler d1 list --json 2>$null
  if ($LASTEXITCODE -eq 0 -and $listJson) {
    $databases = $listJson | ConvertFrom-Json
    $existing = $databases | Where-Object {
      $_.name -eq $DbName -or $_.database_name -eq $DbName
    } | Select-Object -First 1

    if ($existing) {
      $dbId = $existing.uuid
      if (!$dbId) { $dbId = $existing.id }
      if (!$dbId) { $dbId = $existing.database_id }
      Write-Host "D1 already exists: $DbName ($dbId)"
    }
  }
} catch {
  Write-Host "Could not read D1 list as JSON; will create or parse from create output."
}

if (!$dbId) {
  Write-Host "Creating D1 database: $DbName"
  $createOutput = & $Wrangler d1 create $DbName 2>&1 | Out-String
  Write-Host $createOutput
  $match = [regex]::Match(
    $createOutput,
    "[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}"
  )
  if ($match.Success) {
    $dbId = $match.Value
  }
}

if (!$dbId) {
  throw "Could not determine D1 database_id for $DbName."
}

Write-Host "Updating wrangler.jsonc..."
$wranglerPath = Join-Path $Root "wrangler.jsonc"
$content = Get-Content -LiteralPath $wranglerPath -Raw
$content = $content -replace '"name":\s*"[^"]+"', ('"name": "' + $WorkerName + '"')
$content = $content -replace '"database_name":\s*"[^"]+"', ('"database_name": "' + $DbName + '"')
$content = $content -replace '"database_id":\s*"[^"]+"', ('"database_id": "' + $dbId + '"')
$content = $content -replace '"NEXT_PUBLIC_APP_URL":\s*"[^"]+"', ('"NEXT_PUBLIC_APP_URL": "https://' + $Domain + '"')
$content = $content -replace '"NEXT_PUBLIC_APP_NAME":\s*"[^"]+"', '"NEXT_PUBLIC_APP_NAME": "Quest Codes"'
Set-Content -LiteralPath $wranglerPath -Value $content -Encoding UTF8

if (!(Test-Path ".env.production")) {
  @"
NEXT_PUBLIC_APP_URL=https://$Domain
NEXT_PUBLIC_APP_NAME=Quest Codes
NEXT_PUBLIC_APP_DESCRIPTION=Source-checked Roblox codes, game guides, tier lists, and update references.
"@ | Set-Content -LiteralPath ".env.production" -Encoding UTF8
}

if (!$SkipSecret) {
  Write-Host "Uploading AUTH_SECRET to Cloudflare (value is not printed)..."
  $secret = node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
  $secret | & $Wrangler secret put AUTH_SECRET
}

if (!$SkipMigrations) {
  Write-Host "Applying D1 migrations to remote database..."
  "y" | & $Wrangler d1 migrations apply $DbName --remote
  Write-Host "Remote migration status:"
  & $Wrangler d1 migrations list $DbName --remote
}

Write-Host ""
Write-Host "Cloudflare first setup is complete."
Write-Host "Next step: ask Codex to run/confirm the final deploy."
