#!/bin/zsh
set -e
cd ~/defrag-ai-gateway-app
MSG="${1:-checkpoint}"
git add -A
git commit -m "$MSG" || true
git push origin main
npx vercel --prod
