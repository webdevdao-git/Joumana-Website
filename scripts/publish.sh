#!/usr/bin/env bash
# Build the site and push it to the deploy branch, which is what Hostinger
# clones into public_html.
#
#   npm run publish
#
# The deploy branch holds only the built files: index.html, the pages, _next,
# the artwork and .htaccess at its root. It is force pushed every time, so its
# history is a list of deploys and any of them can be rolled back to.
set -euo pipefail

cd "$(dirname "$0")/.."
SHA=$(git rev-parse --short HEAD)
REMOTE=$(git remote get-url origin)

echo "building..."
npm run build:preview >/dev/null

test -f out/index.html
test -f out/.htaccess

# out/ is wiped by every build, so the branch is assembled outside it
STAGE=$(mktemp -d)
trap 'rm -rf "$STAGE"' EXIT
cp -R out/. "$STAGE"/
find "$STAGE" -name ".DS_Store" -delete

cd "$STAGE"
git init -q
git checkout -q -b deploy
git config user.name "webdevdao-git"
git config user.email "webdevdao-git@users.noreply.github.com"
git add -A
git commit -qm "Build of $SHA"
git remote add origin "$REMOTE"
git push -qf origin deploy

echo "pushed $(git ls-files | wc -l | tr -d ' ') files to the deploy branch"
echo "now press Deploy in hPanel, or let the webhook do it"
