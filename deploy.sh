#!/bin/bash
set -euo pipefail

# The repo we DEPLOY (checked out to main, served by nginx)
DEPLOY_DIR="/volume1/docker/beef-stew-site"
REPO_OWNER="jack"
LOCK="/tmp/beef-stew-deploy.lock"
LOG="/var/services/homes/jack/beef-stew-site/deploy.log"


# Prevent overlapping scheduler runs
exec 9>"$LOCK"
flock -n 9 || { echo "$(date): another deploy is running, skipping"; exit 0; }

git_as_owner() {
  sudo -H -u "$REPO_OWNER" git -c "safe.directory=$DEPLOY_DIR" -C "$DEPLOY_DIR" "$@"
}

git_as_owner fetch origin main
LOCAL=$(git_as_owner rev-parse HEAD)
REMOTE=$(git_as_owner rev-parse origin/main)

if [ "$LOCAL" = "$REMOTE" ]; then
  echo "$(date): no changes"
  exit 0
fi

echo "$(date): deploying $REMOTE"
git_as_owner switch main 2>/dev/null || git_as_owner checkout main
git_as_owner reset --hard origin/main
cd "$DEPLOY_DIR"
docker compose up -d --force-recreate
echo "$(date): deploy complete"


# Keep deploy.log to the last 5000 lines
if [ -f "$LOG" ]; then
    tail -n 5000 "$LOG" > "${LOG}.tmp" \
        && mv "${LOG}.tmp" "$LOG"
fi
