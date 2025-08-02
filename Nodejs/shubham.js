const express = require('express');
const app = express();
const axios = require('axios'); 
app.get('/track',async (req, res) => {
  const { pid, uid, action } = req.query;

  // Redirect to Akshay's tracking backend
 const response = await axios.get(`http://localhost:5050/track`, {
      params: { pid, uid, action },
    });

    // original response wapas bhej do
    res.send(response.data);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Shubham redirect server running at http://localhost:${PORT}`);
});

//thenoval research
