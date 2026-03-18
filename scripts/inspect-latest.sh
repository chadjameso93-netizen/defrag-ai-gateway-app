#!/bin/zsh
set -e
cd ~/defrag-ai-gateway-app
URL=$(npx vercel ls | awk '/defrag-premium-.*vercel\.app/ {print $2; exit}')
if [ -z "$URL" ]; then
  echo "No deployment URL found"
  exit 1
fi
echo "$URL"
npx vercel inspect "$URL" --logs --wait
