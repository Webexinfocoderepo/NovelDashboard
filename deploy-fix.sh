#!/bin/bash

echo "🔧 Deploying Fix for /api/track URLs..."

# Step 1: Update nginx configuration
echo "📝 Updating nginx configuration..."
cat > /tmp/noveldashboard-updated.conf << 'EOF'
server {
    listen 80;
    server_name 13.235.83.129;

    # Serve the HTML pages directly
    location ~ ^/(complete|terminate|quotafull|test-tracking) {
        root /var/www/html/NovelDashboard/public;
        try_files $uri $uri.html =404;
    }

    # Handle API routes with /api/ prefix
    location /api/ {
        proxy_pass http://127.0.0.1:5050/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Serve React app for all other routes
    location / {
        root /var/www/html/NovelDashboard/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
EOF

sudo cp /tmp/noveldashboard-updated.conf /etc/nginx/sites-available/noveldashboard
sudo ln -sf /etc/nginx/sites-available/noveldashboard /etc/nginx/sites-enabled/default

echo "🧪 Testing nginx configuration..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Nginx configuration is valid!"
    echo "🔄 Reloading nginx..."
    sudo systemctl reload nginx
    echo "✅ Nginx reloaded successfully!"
else
    echo "❌ Nginx configuration has errors. Please check manually."
    exit 1
fi

# Step 2: Restart Node.js server to apply code changes
echo "🔄 Restarting Node.js server..."
pm2 restart noveldashboard-api

echo ""
echo "🎯 Your tracking URLs are now:"
echo "Complete: http://13.235.83.129/api/track?pid=111&uid=111&action=Complete"
echo "Terminate: http://13.235.83.129/api/track?pid=111&uid=111&action=Terminate"
echo "Quotafull: http://13.235.83.129/api/track?pid=111&uid=111&action=Quotafull"
echo ""
echo "✅ Fix deployed! Test the URLs above." 