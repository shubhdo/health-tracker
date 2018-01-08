const bcrypt = require('bcrypt');
const User = require('../models/user')
const functions = require('./common_files')

function Signup(req, res) {

    let user = new User(req.body);
    user.save(function (error, result) {
        if (error) {
            console.log(error);
            if (error.code == 11000)
                functions.sendResponse(res, 500, "Please Enter Unique Email.")
            else
                functions.sendResponse(res, 500, "Something went wrong.")
        } else {
            functions.sendMail(req.body.email, "Please visit this link http://localhost:3001/api/v1/user/" + result._id + " To activate your account.", (err, info) => {
                if (err) {
                    console.log("err", err)
                    functions.sendResponse(res, 500, "Something went wrong in sending mail")

                } else {
                    console.log("info", info)
                    functions.sendResponse(res, 201, "Signup Successful.")
                }
            })

        }
    })
}

function login(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({
        email: email
    }, {
        password: 1,
        authenticated: 1
    }, (err, result) => {
        if (err) {
            console.log(err);
            functions.sendResponse(res, 500, "Something went wrong.")

        } else {
            if (result === null) {
                functions.sendResponse(res, 400, "Email does not exist. Please register")
            } else {
                if (result.authenticated)
                    bcrypt.compare(password, result.password, function (err, success) {
                        if (err) {
                            console.log(err);
                            functions.sendResponse(res, 500, "Something went wrong.")
                        } else {
                            if (success)
                                functions.sendResponse(res, 200, "Successful.", result)
                            else
                                functions.sendResponse(res, 400, "Password is incorrect.")
                        }

                    })
                else
                    functions.sendResponse(res, 400, "Please first verify your email")
            }
        }
    });
}

function verify(req, res) {
    console.log(req.params.id)
    User.findByIdAndUpdate(req.params.id, {
            $set: {
                authenticated: true
            }
        }, {
            new: true
        })
        .then((result) => res.redirect('http://localhost:8000/#!/login'))
        .catch((failed) => res.json(failed))
}

function editProfle(req, res) {
    User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        })
        .then((result) => functions.sendResponse(res, 200, "Successful.", result))
        .catch((failed) => functions.sendResponse(res, 500, "Something went wrong."))
}

function addHeartRate(req, res) {
    User.findByIdAndUpdate(req.params.id, {
            $push: {
                heartRate: req.body
            }
        }, {
            new: true
        })
        .then((result) => functions.sendResponse(res, 200, "Successful.", result))
        .catch((failed) => functions.sendResponse(res, 500, "Something went wrong."))
}

function addTempreature(req, res) {
    User.findByIdAndUpdate(req.params.id, {
            $push: {
                tempreature: req.body
            }
        }, {
            new: true
        })
        .then((result) => functions.sendResponse(res, 200, "Successful.", result))
        .catch((failed) => functions.sendResponse(res, 500, "Something went wrong."))
}

function listData(req,res) {
    User.findById(req.params.id)
    .then((result) => functions.sendResponse(res, 200, "Successful.", result))
    .catch((failed) => functions.sendResponse(res, 500, "Something went wrong."))
}

module.exports = {
    Signup,
    login,
    verify,
    editProfle,
    addHeartRate,
    addTempreature,
    listData
}