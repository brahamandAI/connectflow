#!/bin/bash
set -e

echo "🚀 Starting deployment process..."

npm install
npm run build
pm2 delete ecosystem.config.js
pm2 start ecosystem.config.js
