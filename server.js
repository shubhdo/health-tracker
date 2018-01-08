const express = require('express');
const body_parser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors())

const user_routes=require('./routes/user_routes');

let url = 'mongodb://localhost:27017/signup';
mongoose.connect(url);
let db = mongoose.connection;

db.on('error', function (error) {
    console.log(error);
});

db.once('open', function () {
    console.log("connected");
});
app.use(body_parser.json({limit:'50mb'}));
app.use('/api/v1/user/',user_routes);
app.use(body_parser.urlencoded({extended: false}));
app.listen(3001, function () {
    console.log("listening on 3001")
});
