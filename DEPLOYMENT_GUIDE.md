# 🚀 Live Server Deployment Guide

## Overview
This guide will help you deploy the tracking system to your live server at `13.235.83.129`.

## Prerequisites
- Access to your server via SSH
- nginx installed on the server
- Node.js and npm installed on the server
- PM2 installed for process management

## Step-by-Step Deployment

### 1. Build the React App (Local Machine)
```bash
npm run build
```

### 2. Upload Files to Server
Upload the entire project to your server at `/var/www/html/NovelDashboard/`

### 3. Configure Nginx
```bash
# Copy the nginx configuration
sudo cp nginx-config.conf /etc/nginx/sites-available/noveldashboard

# Enable the site
sudo ln -s /etc/nginx/sites-available/noveldashboard /etc/nginx/sites-enabled/

# Remove default site if needed
sudo rm /etc/nginx/sites-enabled/default

# Test nginx configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

### 4. Install Dependencies and Start Node.js Server
```bash
# Navigate to Node.js directory
cd /var/www/html/NovelDashboard/Nodejs

# Install dependencies
npm install

# Start the server with PM2
pm2 start server.js --name noveldashboard-api

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### 5. Test the Deployment
Visit these URLs to test:
- **Complete:** http://13.235.83.129/track?pid=111&uid=111&action=Complete
- **Terminate:** http://13.235.83.129/track?pid=111&uid=111&action=Terminate
- **Quotafull:** http://13.235.83.129/track?pid=111&uid=111&action=Quotafull
- **Test Page:** http://13.235.83.129/test-tracking

## Troubleshooting

### Check if Node.js server is running:
```bash
pm2 status
pm2 logs noveldashboard-api
```

### Check nginx status:
```bash
sudo systemctl status nginx
sudo nginx -t
```

### Check nginx logs:
```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

## Expected Behavior

When someone visits `http://13.235.83.129/track?pid=111&uid=111&action=Complete`:

1. ✅ Data gets saved to MongoDB
2. ✅ User gets redirected to the Complete page
3. ✅ Complete page shows with "Insights Elite" branding

Same behavior for Terminate and Quotafull actions.

## Files Structure on Server
```
/var/www/html/NovelDashboard/
├── build/                    # React app build
├── Nodejs/                   # Node.js backend
│   ├── server.js
│   ├── routes/
│   └── models/
├── public/                   # HTML pages
│   ├── complete.html
│   ├── terminate.html
│   ├── quotafull.html
│   └── test-tracking.html
└── nginx-config.conf
``` 