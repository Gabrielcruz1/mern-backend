const express = require('express')
const router = express.Router();
const { Post } = require('../models/index')

//INDEX
router.get('/', async (req, res, next) => {
    try {
        const allPosts = await Post.find({}).populate('owner', 'username -_id').exec();
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
    try {
        const foundPost = await Post.findById(req.params.id)
            .populate("owner")
            .exec();
        res.status(200).json(foundPost)
    } catch (err) {
        res.status(400).json({ error: "error" })
        return next(err)
    }
});

//UPDATE
router.put('/:id', async (req, res, next) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json(updatedPost)
    } catch (err) {
        res.status(400).json({ error: "error" })
        return next(err)
    }
});

//DELETE
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        res.redirect('/posts')
    } catch (err) {
        res.status(400).json({ error: "error" })
        return next(err)
    }
});

module.exports = router