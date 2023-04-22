const express = require('express')
const router = express.Router();
const { Post } = require('../models/Post')

//INDEX
router.get('/', async (req, res, next) => {
    res.send('posts Index Route')
});

//POST
router.post('/', async (req, res, next) => {
    res.send('Posts Create Route')
})

//SHOW
router.get('/:id', async (req, res, next) => {
    res.send('Posts Show Route')
});

//UPDATE
router.put('/:id', async (req, res, next) => {
    res.send('Posts Update Route')
});

//DELETE
router.delete('/:id', async (req, res, next) => {
    res.send('Posts Delete Route')
});


module.exports = router