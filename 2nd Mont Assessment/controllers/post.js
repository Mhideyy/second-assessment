const postModel = require('../models/post');

const makePost = async (req,res) => {
    const body = req.body;
    const madePost = new postModel(body);
    try {
        await madePost.save();
        res.json({ message: "post made succesfully" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// finding all post
const findPost = async (req,res) => {
    try {
        const foundPost = await postModel.find();
        res.json(foundPost)
    } catch (error) {
        res.json({ message: error.message });
    }
}

// finding one post
const findOnePost = async (req,res) => {
    const { id } = req.params;
    try {
        const foundedPost = await postModel.findById(id);
        res.json(foundedPost)
    } catch (error) {
        res.json({ message: error.message });
    }
};


// likes
const likePost = async (req,res) => {
    const { id, userId } = req.body;
    const thePost = await postModel.findById(id);
    const gottenLikes = thePost.likes;
    const checkLike = gottenLikes.includes(userId);
    if(!checkLike){
        gottenLikes.push(userId);
    } else {
        const getIndex = gottenLikes.indexOf(userId);
        gottenLikes.slice(getIndex, 1);
    }
        try {
            await postModel.findByIdAndUpdate(id, { likes: gottenLikes }, { new: true });
            res.json({ message: "like updated successfully" });
        } catch (error) {
            res.json({ message: error.message });
        }
};

// dislikes
const dislikePost = async (req,res) => {
    const { id, userId } = req.body;
    const thePost = await postModel.findById(id);
    const gottendisLikes = thePost.dislikes;
    const checkdisLike = gottendisLikes.includes(userId);
    if(!checkdisLike){
        gottendisLikes.push(userId);
    } else {
        const getIndex = gottendisLikes.indexOf(userId);
        gottendisLikes.slice(getIndex, 1);
    }
        try {
            await postModel.findByIdAndUpdate(id, { likes: gottendisLikes }, { new: true });
            res.json({ message: "like updated successfully" });
        } catch (error) {
            res.json({ message: error.message });
        }
};




module.exports = { makePost, findPost , findOnePost, dislikePost, likePost };
