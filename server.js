const express = require('express');

const app = express();

const PORT = 12000

app.listen(PORT, () => console.log(`Listening for client requests on port ${PORT} `));