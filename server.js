//IMPORTS 
const express = require('express');
const app = express();

//APP DEPENDENCIES
const cors = require('cors')
const morgan = require('morgan')

//INITIALIZE .ENV VARIABLES
require("dotenv").config();
require("./config/db.connection")

const { PORT, MONGODB_URI } = process.env;

//IMPORT CONTROLLER
const authController = require('./controllers/auth')
const postController = require('./controllers/post_controller')

//MIDDLEWARE
app.use(cors())
app.use(morgan('dev'))
app.use(express.json());
app.use('/auth', authController)
app.use('/posts', postController)

app.get("/", (req, res) => {
    res.redirect('/posts');
});

// 404
app.all("/*", (req, res) => {
    return res.status(404).json({ error: "No resource found" });
});

app.listen(PORT, () => console.log(`Listening for client requests on port ${PORT} `));