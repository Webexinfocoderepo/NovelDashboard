const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');

// ✅ /track route
router.get('/track', async (req, res) => {
  const { pid, uid, action } = req.query;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  if (!pid || !uid || !action) {
    return res.status(400).send("Missing required query parameters.");
  }

  try {
    await Visitor.create({
      projectId: pid,
      userId: uid,
      status: action,
      ip: ip
    });

    // Log the tracking data
    console.log('Tracking data:', { pid, uid, action, timestamp: new Date().toISOString() });
    
    // Redirect based on action
    switch(action) {
        case 'Complete':
            res.redirect('/complete');
            break;
        case 'Terminate':
            res.redirect('/terminate');
            break;
        case 'Quotafull':
            res.redirect('/quotafull');
            break;
        default:
            res.redirect('/terminate'); // Default to terminate page
    }
  } catch (err) {
    res.status(500).send("Something went wrong.");
  }
});
router.get('/visitors', async (req, res) => {
    try {
      const allVisitors = await Visitor.find().sort({ createdAt: -1 });
       if (!allVisitors || allVisitors.length === 0) {
      return res.json([]);
    }

    // res.json(allVisitors);
      res.json(allVisitors);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch visitors' });
    }
  });
module.exports = router;




// server {
//     listen 80;

//     server_name 13.235.83.129;

//     root /var/www/html/NovelDashboard/build;
//     index index.html;

//     location / {
//         try_files $uri /index.html;
//     }

//     # ✅ Backend for API
//     location /api/ {
//         proxy_pass http://127.0.0.1:5050/;
//         proxy_http_version 1.1;
//         proxy_set_header Upgrade $http_upgrade;
//         proxy_set_header Connection 'upgrade';
//         proxy_set_header Host $host;
//         proxy_cache_bypass $http_upgrade;
//     }
// }