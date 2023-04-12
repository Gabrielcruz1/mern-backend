const express = require('express');

const app = express();

const PORT = 12000

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
});

app.listen(PORT, () => console.log(`Listening for client requests on port ${PORT} `));