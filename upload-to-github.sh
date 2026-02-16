#!/bin/bash
# Run this script in your terminal to init git and prepare for GitHub push.
# Usage: ./upload-to-github.sh
# Then add your remote and push (see end of script).

set -e
cd "$(dirname "$0")"

if [ -d .git ]; then
  echo "Git already initialized."
else
  git init
  echo "Git initialized."
fi

git add -A
git status

if [ -z "$(git status --porcelain)" ]; then
  echo "Nothing to commit (working tree clean)."
else
  git commit -m "Initial commit: MacroNext MVP with Clerk, Prisma, meal planning"
  echo "Committed."
fi

echo ""
echo "--- Next steps ---"
echo "1. Create a new repo at https://github.com/new (no README/.gitignore)"
echo "2. Run:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo "   (Replace YOUR_USERNAME and YOUR_REPO with your GitHub repo details)"
