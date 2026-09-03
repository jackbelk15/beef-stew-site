#!/bin/bash
set -euo pipefail

# The repo we DEPLOY (checked out to main, served by nginx)
DEPLOY_DIR="/volume1/docker/beef-stew-site"
LOCK="/tmp/beef-stew-deploy.lock"
LOG="/var/services/homes/jack/beef-stew-site/deploy.log"


# Prevent overlapping scheduler runs
exec 9>"$LOCK"
flock -n 9 || { echo "$(date): another deploy is running, skipping"; exit 0; }

cd "$DEPLOY_DIR"

git fetch origin main
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)

if [ "$LOCAL" = "$REMOTE" ]; then
  echo "$(date): no changes"
  exit 0
fi

echo "$(date): deploying $REMOTE"
git switch main 2>/dev/null || git checkout main
git reset --hard origin/main
docker compose up -d --force-recreate
echo "$(date): deploy complete"


# Keep deploy.log to the last 5000 lines
if [ -f "$LOG" ]; then
    tail -n 5000 "$LOG" > "${LOG}.tmp" \
        && mv "${LOG}.tmp" "$LOG"
fi
