const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const visitorRoutes = require('./routes/visitor');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server running');
});

mongoose.connect('mongodb://localhost:27017/urlTracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// ✅ Use routes
app.use('/', visitorRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
