#!/bin/bash

set -e

# Variables
ORIGIN_URL=`git config --get remote.origin.url`

echo "Publishing docs..."

# Checkout gh-pages branch.
if [ `git branch | grep gh-pages` ]
then
  git branch -D gh-pages
fi
git checkout -b gh-pages

# Build site.
npm run docs

# Delete and move files.
find . -maxdepth 1 ! -name 'docs' ! -name '.git' ! -name '.gitignore' -exec rm -rf {} \;
mv docs/* .
rm -R docs/

# Push to gh-pages.
git config user.name "$andrewscwei"
git config user.email "$andrew@variante.io"

git add -fA
git commit --allow-empty -m "$(git log -1 --pretty=%B) [ci skip]"
git push -f $ORIGIN_URL gh-pages

# Move back to previous branch.
git checkout -

echo "Done publishing docs"

exit 0
