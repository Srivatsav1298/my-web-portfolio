#!/bin/bash

# Portfolio Push Script
# This script will push your portfolio changes to GitHub

echo "🚀 Pushing VatsWebsite portfolio to GitHub..."
echo ""
echo "Repository: https://github.com/Srivatsav1298/my-web-portfolio"
echo ""

# Navigate to project directory
cd /Users/kamal/Desktop/Raicode/VatsWebsite

# Verify we have commits to push
if git diff --quiet origin/main; then
  echo "✅ No changes to push - already up to date!"
  exit 0
fi

echo "📦 Changes ready to push:"
git log origin/main..HEAD --oneline
echo ""

# Attempt push
echo "🔐 You will be prompted for GitHub credentials:"
echo "   Username: Srivatsav1298"
echo "   Password: Your Personal Access Token"
echo ""
echo "   Don't have a token? Get one here:"
echo "   https://github.com/settings/tokens"
echo ""

git push origin main

# Check if push was successful
if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Successfully pushed to GitHub!"
  echo "🌐 View your portfolio at: https://github.com/Srivatsav1298/my-web-portfolio"
else
  echo ""
  echo "❌ Push failed. Common issues:"
  echo "   1. Invalid credentials - check username/token"
  echo "   2. Token expired - generate a new one"
  echo "   3. Insufficient permissions - token needs 'repo' scope"
  echo ""
  echo "   Create token at: https://github.com/settings/tokens"
fi
