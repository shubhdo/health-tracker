const nodemailer = require('nodemailer');


module.exports = {
    sendResponse: function (responseObject, status, responseMessage, response) {
        responseObject.send({
            responseCode: status,
            responseMessage: responseMessage,
            result: response
        })
    },
    sendMail: function (to, text, cb) {
        console.log(text)
        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport({

            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'healthfyp@gmail.com',
                pass: 'sensors1'
            }
        });

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: 'help@healthtracker.com', // sender address
            to: to, // list of receivers
            subject: 'Health Tracker', // Subject line
            text: text, // plaintext body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, cb);
    }

}