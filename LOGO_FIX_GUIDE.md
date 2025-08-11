# 🔧 Logo Fix Guide

## Problem
Logo image is not displaying on the pages.

## Solution

### Step 1: Upload the image file
Upload your `screenshot-2025.png` file to your server at:
```
/var/www/html/NovelDashboard/public/screenshot-2025.png
```

### Step 2: Check file permissions
```bash
# SSH into your server
ssh root@13.235.83.129

# Navigate to the public folder
cd /var/www/html/NovelDashboard/public

# Check if the image exists
ls -la screenshot-2025.png

# If it doesn't exist, upload it
# You can use scp, rsync, or any file transfer method
```

### Step 3: Set correct permissions
```bash
# Set read permissions for the image
chmod 644 screenshot-2025.png

# Set ownership
chown www-data:www-data screenshot-2025.png
```

### Step 4: Test the image URL
Visit this URL in your browser to test if the image loads:
```
http://13.235.83.129/screenshot-2025.png
```

### Step 5: Alternative image paths to try
If the above doesn't work, try these alternative paths in the HTML files:

**Option 1: Relative path**
```html
<img src="screenshot-2025.png" alt="NOVEL RESEARCH" class="logo-image">
```

**Option 2: Absolute path with /api/**
```html
<img src="/api/screenshot-2025.png" alt="NOVEL RESEARCH" class="logo-image">
```

**Option 3: Full URL**
```html
<img src="http://13.235.83.129/screenshot-2025.png" alt="NOVEL RESEARCH" class="logo-image">
```

### Step 6: Check nginx configuration
Make sure nginx is serving static files from the public folder:

```nginx
# Add this to your nginx config if not already present
location ~* \.(png|jpg|jpeg|gif|ico|css|js)$ {
    root /var/www/html/NovelDashboard/public;
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Step 7: Restart services
```bash
# Reload nginx
sudo systemctl reload nginx

# Restart Node.js server
pm2 restart noveldashboard-api
```

## Debugging
If the logo still doesn't show:

1. **Check browser console** for 404 errors
2. **Check nginx error logs:**
   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```
3. **Check if the image file exists:**
   ```bash
   ls -la /var/www/html/NovelDashboard/public/
   ```

## Quick Test
Visit these URLs to test:
- `http://13.235.83.129/api/complete`
- `http://13.235.83.129/api/terminate`
- `http://13.235.83.129/api/quotafull`

The logo should appear at the top of each page. 