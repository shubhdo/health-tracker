const routes = require('express').Router();
const User = require('../models/user')
const functions = require('../file_handler/common_files');
const user_handler = require('../file_handler/user_handler')
routes.post('/signup', user_handler.Signup);
routes.post('/login', user_handler.login);
module.exports = routes;