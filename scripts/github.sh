#!/usr/bin/env bash

echo "[Package] Generate github page..."
npm run vendor
npm run pages
rm -rf /tmp/builds
mv builds /tmp
git checkout gh-pages
rm -rf ./builds
mv /tmp/builds .
git add .
git commit -m "update pages"
git push -f

echo "[Package] Back to master branch..."
git checkout master
npm run vendor
npm restart

echo "[Publish] Finished!"
