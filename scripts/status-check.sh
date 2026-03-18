#!/bin/zsh
set -e
cd ~/defrag-ai-gateway-app
git status
npx vercel ls | head -20
echo ""
echo "Launch check:"
curl -s https://defrag-premium.vercel.app/api/v1/launch-check
echo ""
echo ""
echo "Domain check:"
vercel domains inspect defrag.app || true
echo ""
vercel domains inspect www.defrag.app || true
