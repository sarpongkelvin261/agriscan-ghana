#!/bin/bash
set -e

# Usage: ./scripts/push_to_github.sh <GITHUB_TOKEN> [REPO_NAME]
GITHUB_USERNAME="sarpongkelvin261"
REPO_NAME="${2:-agriscan-ghana}"
TOKEN="$1"

if [ -z "$TOKEN" ]; then
  echo "Error: GitHub Personal Access Token required."
  echo "Usage: ./scripts/push_to_github.sh <YOUR_GITHUB_TOKEN> [REPO_NAME]"
  exit 1
fi

echo "Creating public repository '$REPO_NAME' on GitHub for $GITHUB_USERNAME..."
CREATE_RES=$(curl -s -X POST \
  -H "Authorization: token $TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/repos \
  -d "{\"name\":\"$REPO_NAME\",\"description\":\"AgriScan Ghana - AI Crop Disease Scanner with Ghanaian Twi Audio & PWA\",\"private\":false}")

echo "Response from GitHub API: $CREATE_RES"

echo "Setting remote origin..."
git remote remove origin 2>/dev/null || true
git remote add origin "https://$TOKEN@github.com/$GITHUB_USERNAME/$REPO_NAME.git"

echo "Pushing code to main branch..."
git push -u origin main

# Clean up token from remote URL for security
git remote set-url origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

echo "Successfully created and pushed repository to https://github.com/$GITHUB_USERNAME/$REPO_NAME !"
