const express = require('express');
const app = express();
const PORT = 12000

require('./config/db.connection');

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
});

// 404
app.all("/*", (req, res) => {
    return res.status(404).json({error:"No resource found"});
  });

app.listen(PORT, () => console.log(`Listening for client requests on port ${PORT} `));