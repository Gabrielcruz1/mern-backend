const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const router = express.Router();
const { createUserToken } = require("../middleware/auth");
// SIGN UP
// POST /auth/register
router.post("/register", async (req, res, next) => {
    //   has the password before storing the user info in the database
    try {
        // Create salt to make our password unique - 10 cycles of rand. hashing
        const salt = await bcrypt.genSalt(10);
        // Create password hash from req.body.password 
        const passwordHash = await bcrypt.hash(req.body.password, salt);

        const pwStore = req.body.password;
        //original password from client
        // we store this temporarily so the origin plain text password can be parsed by the createUserToken();

        req.body.password = passwordHash;
        // modify req.body (for storing hash in db)

        const newUser = await User.create(req.body);

        if (newUser) {
            req.body.password = pwStore;
            const authenticatedUserToken = createUserToken(req, newUser);
            res.status(201).json({
                user: newUser,
                isLoggedIn: true,
                token: authenticatedUserToken,
            });
        } else {
            res.status(400).json({ error: "Something went wrong" })
        }
    } catch (err) {
        //send error object with message "error"
        res.status(400).json({ error: err.message });
    }
});



// SIGN IN
// POST /auth/login
router.post("/login", async (req, res, next) => {
    try {
        const loggingUser = req.body.username;
        const foundUser = await User.findOne({ username: loggingUser });
        const token = await createUserToken(req, foundUser);
        //
        res.status(200).json({
            user: foundUser,
            isLoggedIn: true,
            token,
        });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
});




module.exports = router