#!/bin/bash

echo "🚀 Deploying Tracking System to Live Server..."

# Step 1: Build the React app
echo "📦 Building React app..."
npm run build

# Step 2: Copy files to server (you'll need to run this on your server)
echo "📋 Files to copy to server:"
echo "1. Copy the entire project to: /var/www/html/NovelDashboard/"
echo "2. Copy nginx-config.conf to: /etc/nginx/sites-available/noveldashboard"
echo "3. Enable the site: sudo ln -s /etc/nginx/sites-available/noveldashboard /etc/nginx/sites-enabled/"
echo "4. Test nginx: sudo nginx -t"
echo "5. Reload nginx: sudo systemctl reload nginx"

# Step 3: Install dependencies and start Node.js server
echo "🔧 On your server, run these commands:"
echo "cd /var/www/html/NovelDashboard/Nodejs"
echo "npm install"
echo "pm2 start server.js --name noveldashboard-api"
echo "pm2 save"
echo "pm2 startup"

echo ""
echo "✅ Deployment instructions completed!"
echo ""
echo "🌐 Your tracking URLs will be:"
echo "Complete: http://13.235.83.129/track?pid=111&uid=111&action=Complete"
echo "Terminate: http://13.235.83.129/track?pid=111&uid=111&action=Terminate"
echo "Quotafull: http://13.235.83.129/track?pid=111&uid=111&action=Quotafull"
echo "Test Page: http://13.235.83.129/test-tracking" 