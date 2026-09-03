# deploy-tooling

Deployment automation for the Beef-Stew site. **This is an orphan branch — it shares no history or files with `main` and is never merged into it.**

## What's here

- `deploy.sh` — polls `origin/main`; if it changed, hard-resets the live checkout and recreates the container.
- `.gitignore` — keeps the generated `deploy.log` out of git.

## Where it runs

Checked out separately on the Synology at:

    /var/services/homes/jack/beef-stew-deploy/

It operates on the live site repo at `/volume1/docker/beef-stew-site` (checked out to `main`). The two checkouts are independent, so the deploy repo's `git reset --hard` never touches this script.

## Schedule

Run by DSM Task Scheduler every 5 minutes as root:

    bash /var/services/homes/jack/beef-stew-deploy/deploy.sh >> /var/services/homes/jack/beef-stew-deploy/deploy.log 2>&1

## Editing

After pushing changes to this branch, run `git pull` in the home-dir checkout to apply them. The script does not update itself.
