const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const visitorRoutes = require('./routes/visitor');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.send('Server running');
});

// Serve the HTML pages
app.get('/api/complete', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/complete.html'));
});

app.get('/api/terminate', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/terminate.html'));
});

app.get('/api/quotafull', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/quotafull.html'));
});

app.get('/api/test-tracking', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/test-tracking.html'));
});

mongoose.connect('mongodb+srv://akshay:akshayAi@cluster0.x0klfly.mongodb.net/Novel?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// ✅ Use routes
app.use('/', visitorRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
