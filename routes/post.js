const express = require('express');
const Post = require('../model/Post');

const router = express.Router();


//Getting all the data query
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        res.status(200).json(posts)
    }catch(err) {
        res.status(400).json({message: err})
    }
});

//POST THE DATA

// router.post('/post', (req, res) => {
//     //console.log(req.body);
//     const post = new Post(req.body);
//     post.save()
//         .then(result => {
//            res.status(200).json({
//                post: result
//            })
//     }).catch(err => {err.message})
// })

//2ND METHOD
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try{
        const savedPost = await post.save();
        res.status(200).json(savedPost)
    }catch(err){
        res.json({message:err})
    }
})

// GET SPECIFIC POSTS
router.get('/:postId', async (req, res) => {
    //console.log(req. params.postId);
    try{
        const singlePost = await Post.findById(req.params.postId);
        res.status(200).json(singlePost);
    }catch(err){
        res.status(400).json({message: err})
    }
})


//DELETE THE POSTS
router.delete('/:postId', async (req, res) => {
    try{
        const deletePost = await Post.remove({_id: req.params.postId});
        res.status(200).json(deletePost);
    }catch(err) {
        res.status(400).json({ message: err })
    }
})

//UPDATE THE POSTS
router.patch('/:postId',async (req, res) => {
    try{
        const updatePost = await Post.updateOne({_id: req.params.postId}, {$set: {title: req.body.title}})
        res.status(200).json(updatePost);
    }catch(err){
        res.status(400).json({ message: err })
    }
})
module.exports = router;