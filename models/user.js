const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


const User = new Schema({
    firstname: {
        type: String,
        match: [/^[A-Za-z]+$/, 'Only alphabets are allowed'],
        trim: true
    },
    lastname: {
        type: String,
        match: [/^[A-Za-z]+$/, 'Only alphabets are allowed'],
        trim: true
    },
    email: {
        type: String,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
        unique: [true, 'email already registered'],
        trim: true
    },
    gender: {
        type: String,
        enum: ['MALE', 'FEMALE']
    },
    password: String,
    dob: Date,
    phone: {
        type: Number,
        match: [/^[0-9]{10,14}$/, 'Only numeric value is allowed(10-14 digits only']
    },
    image: String,
    weight: Number,
    height: Number,
    BMI: Number,
    authenticated: {
        type: Boolean,
        default: false
    },
    heartRate: [{
        data: Number,
        dateRecorded: Date
    }],
    tempreature: [{
        data: Number,
        dateRecorded: Date
    }]
});

User.pre('save', function (next) {
    if (this.password) {
        var salt = bcrypt.genSaltSync(10)
        this.password = bcrypt.hashSync(this.password, salt)
    }
    next()
})

module.exports = mongoose.model('User', User, 'User');