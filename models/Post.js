const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { type: String, required: [true, "Must have content"] },
    description: { type: String, required: [true, "Must have content"] },
    image: {type: String},
    price: { 
        type: Number,
        min: [0, "You can not add a negative number"],
        required: [true, "Price can not be empty"]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        //reference to model 
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Post = mongoose.model("Post", PostSchema);

module.exports = Post