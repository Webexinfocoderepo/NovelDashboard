const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const visitorRoutes = require('./routes/visitor');
const adminRoutes= require("./routes/admin")
const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.send('Server running');
});

// Serve the HTML pages
app.get('/complete', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/complete.html'));
});

app.get('/terminate', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/terminate.html'));
});

app.get('/quotafull', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/quotafull.html'));
});

app.get('/test-tracking', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/test-tracking.html'));
});

mongoose.connect('mongodb+srv://akshay:akshayAi@cluster0.x0klfly.mongodb.net/Novel?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// ✅ Use routes
app.use('/', visitorRoutes);
app.use('/admin', adminRoutes);


const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// server {
//     listen 80;
//     server_name 13.235.83.129;

//     # Serve the HTML pages directly
//     location ~ ^/(complete|terminate|quotafull|test-tracking) {
//         root /var/www/html/NovelDashboard/public;
//         try_files $uri $uri.html =404;
//     }

//     # Handle API routes with /api/ prefix
//     location /api/ {
//         proxy_pass http://127.0.0.1:5050/;
//         proxy_http_version 1.1;
//         proxy_set_header Upgrade $http_upgrade;
//         proxy_set_header Connection 'upgrade';
//         proxy_set_header Host $host;
//         proxy_set_header X-Real-IP $remote_addr;
//         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
//         proxy_set_header X-Forwarded-Proto $scheme;
//         proxy_cache_bypass $http_upgrade;
//     }

//     # Serve React app for all other routes
//     location / {
//         root /var/www/html/NovelDashboard/build;
//         index index.html;
//         try_files $uri $uri/ /index.html;
//     }
// } 
// ubuntu@ip-172-31-11-