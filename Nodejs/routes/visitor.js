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

    res.send("Visitor data saved successfully.");
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
