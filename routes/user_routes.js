const routes = require('express').Router();
const User = require('../models/user')
const functions = require('../file_handler/common_files');
const user_handler = require('../file_handler/user_handler')
routes.get('/:id',user_handler.verify);
routes.post('/signup', user_handler.Signup);
routes.post('/login', user_handler.login);
routes.post('/editProfile/:id', user_handler.editProfle);
routes.post('/addHeartRate',user_handler.addHeartRate);
routes.post('/addTempreature',user_handler.addTempreature);
routes.post('/listdata/:id',user_handler.listData)
module.exports = routes;