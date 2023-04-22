const express = require('express')
const router = express.Router();

//INDEX
router.get('/', async (req, res, next) => {
    res.send('posts Index Route')
});

//POST
router.post('/', (req, res, next) => {
    res.send('Posts Create Route')
})

//SHOW
router.get('/:id', (req, res, next) => {
    res.send('Posts Show Route')
});

//UPDATE
router.put('/:id', (req, res, next) => {
    res.send('Posts Update Route')
});

//DELETE
router.delete('/:id', (req, res, next) => {
    res.send('Posts Delete Route')
});


module.exports = router