# 🎯 Correct Tracking URLs

## ✅ Working URLs

Your tracking system works with `/api/track` URLs:

### 🌐 Live Tracking URLs:
- **Complete:** `http://13.235.83.129/api/track?pid=111&uid=111&action=Complete`
- **Terminate:** `http://13.235.83.129/api/track?pid=111&uid=111&action=Terminate`
- **Quotafull:** `http://13.235.83.129/api/track?pid=111&uid=111&action=Quotafull`

### 📄 Direct Page URLs:
- **Complete Page:** `http://13.235.83.129/complete`
- **Terminate Page:** `http://13.235.83.129/terminate`
- **Quotafull Page:** `http://13.235.83.129/quotafull`
- **Test Page:** `http://13.235.83.129/test-tracking`

## 🔄 How It Works

1. **User clicks:** `http://13.235.83.129/api/track?pid=111&uid=111&action=Complete`
2. **Node.js backend:** Saves data to MongoDB
3. **Redirects to:** `http://13.235.83.129/complete`
4. **Shows:** Complete page with "Insights Elite" branding

## 🚀 Quick Deployment

Run this on your server to fix everything:

```bash
# Upload the deploy-fix.sh script to your server
chmod +x deploy-fix.sh
./deploy-fix.sh
```

## 📊 Data Tracking

All tracking data is automatically saved to MongoDB with:
- Project ID (pid)
- User ID (uid)
- Action type (Complete/Terminate/Quotafull)
- IP address
- Timestamp

## 🎨 Design

All pages use the same "Insights Elite" branding and design that matches your termination page.

---

**✅ Ready to use!** 🚀 