const express = require('express')
const router = express.Router();
const { Post } = require('../models/index')

//INDEX
router.get('/', async (req, res, next) => {
    try {
        const allPosts = await Post.find({});
        return res.status(200).json(allPosts)
    } catch (err) {
        res.status(400).json({ error: "error" })
        return next(err)
    }
});

//POST
router.post('/', async (req, res, next) => {
    try {
        const createPost = await Post.create(req.body);
        res.status(201).json(createPost)
    } catch (err) {
        res.status(400).json({ error: "error" })
        return next(err)
    }
})

//SHOW
router.get('/:id', async (req, res, next) => {
    try{

    } catch(err){
		res.status(400).json({error: "error"})
        return next(err)
    }
});

//UPDATE
router.put('/:id', async (req, res, next) => {
    try {

    } catch(err){
		res.status(400).json({error: "error"})
        return next(err)
    }
});

//DELETE
router.delete('/:id', async (req, res, next) => {
    try {

    } catch(err){
		res.status(400).json({error: "error"})
        return next(err)
    }
});

module.exports = router