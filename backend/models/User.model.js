const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require('validator');
// here i am creating new schema where i store users email and otp associat to it
const UserSchema = new Schema
    ({
        email: {
            type: String,
            required: [true, 'please enter an email'],
            unique: true,
            lowercase: true,
            validate: [isEmail, 'please enter a valid email']
        },
        mobile:
        {
            type: Number,
            require: [true, 'please enter mobile number'],
            minLength: [10, 'minimum number have 10 length']
        },
        username:
        {
            type: String,
            minLength: [6, 'minimum password length is 6 charecters'],
            required: [true, 'please enter username']
        },
        address:
        {
            type: String,
            required: [true, 'please enter adress']
        },
        createdAt: { type: Date, default: Date.now }
    })

const User = mongoose.model("User", UserSchema);
module.exports = User;
