const express = require('express');
const app = express();
const PORT = 12000

require('./config/db.connection');

// 404
app.all("/*", (req, res) => {
    return res.status(404).json({error:"No resource found"});
  });

app.listen(PORT, () => console.log(`Listening for client requests on port ${PORT} `));