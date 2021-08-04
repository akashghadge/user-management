const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require('validator');
const bcrypt = require("bcrypt");
// here i am creating new schema where i store users email and otp associat to it
const AdminSchema = new Schema
    ({
        email: {
            type: String,
            required: [true, 'please enter an email'],
            unique: true,
            lowercase: true,
            validate: [isEmail, 'please enter a valid email']
        },
        password: {
            type: String,
            required: [true, 'please enter an password'],
            minLength: [6, 'minimum password length is 6 charecters'],
            default: 'pass@123'
        },
        createdAt: { type: Date, default: Date.now }
    })
AdminSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})
const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
