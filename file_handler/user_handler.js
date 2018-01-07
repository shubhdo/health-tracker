const bcrypt = require('bcrypt');
const User = require('../models/user')
const functions = require('./common_files')

function Signup(req, res) {

    let user = new User(req.body);
    user.save(function (error, result) {
        if (error) {
            console.log(error);
            if(error.code==11000)
            functions.sendResponse(res, 500, "Please Enter Unique Email.")
            else            
            functions.sendResponse(res, 500, "Something went wrong.")
        } else {
            functions.sendMail(req.body.email, "Please visit", (err, info) => {
                if (err) {
                    console.log("err",err)
                    functions.sendResponse(res, 500, "Something went wrong in sending mail")

                }
                else {
                    console.log("info",info)
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
                if(result.authenticated)
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
                functions.sendResponse(res,400,"Please first verify your email")
            }
        }
    });
}

module.exports = {
    Signup,
    login
}