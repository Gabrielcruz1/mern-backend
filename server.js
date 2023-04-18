const express = require('express');
const app = express();

require('./config/db.connection');

const { PORT, MONGODB_URI } = process.env;

// 404
app.all("/*", (req, res) => {
    return res.status(404).json({error:"No resource found"});
  });

app.listen(PORT, () => console.log(`Listening for client requests on port ${PORT} `));