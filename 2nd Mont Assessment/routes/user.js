const express = require('express');
const routes = express.Router();
const { createUser, loginUser} = require('../controllers/user');

routes.post('/user', createUser);
routes.post('/login-user', loginUser);

module.exports = routes;