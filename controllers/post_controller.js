const express = require('express')
const router = express.Router();
const { Post } = require('../models/index')
const { handleValidateOwnership, requireToken } = require("../middleware/auth");

//LOGOUT               middleware
router.get( "/logout", requireToken, async (req, res, next) => {
    try {
      const currentUser = req.user.username
          delete req.user
      res.status(200).json({
        message: `${currentUser} currently logged out`,
        isLoggedIn: false,
        token: "",
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

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

//POST            middle ware 
router.post('/', requireToken, async (req, res, next) => {
    try {
        // passport will verify the the token passed with the request's Authorization headers and set the current user for the request.
        const owner = req.user._id
        req.body.owner = owner 
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
        const foundPost = await Post.findById(req.params.id).populate("owner").exec();
        res.status(200).json(foundPost)
    } catch (err) {
        res.status(400).json({ error: "error" })
        return next(err)
    }
});

//UPDATE
router.put('/:id', requireToken, async (req, res, next) => {
    try {
        handleValidateOwnership(req, await Post.findById(req.params.id))
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json(updatedPost)
    } catch (err) {
        res.status(400).json({ error: "error" })
        return next(err)
    }
});

//DELETE
router.delete('/:id', requireToken, async (req, res, next) => {
    try {
        handleValidateOwnership(req, await Post.findById(req.params.id));
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        res.redirect('/posts')
    } catch (err) {
        res.status(400).json({ error: "error" })
        return next(err)
    }
});

module.exports = router