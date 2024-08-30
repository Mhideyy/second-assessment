const express = require('express');
const routes = express.Router();
const { makePost, findPost, findOnePost, likePost, dislikePost } = require('../controllers/post');


routes.post('/post', makePost);
routes.get('/post', findPost);
routes.get('/post/:id', findOnePost);
routes.post('/like-post', likePost);
routes.post('/dislike-post', dislikePost);


module.exports = routes;