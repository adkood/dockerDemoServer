const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email!'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid Email!'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password!'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password!'],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: "Passwords do not match!"
        }
    }
});

userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified
    if (!this.isModified('password')) return next();

    try {
        // Encrypting password
        this.password = await bcrypt.hash(this.password, 12);
        // Clear passwordConfirm field
        this.passwordConfirm = undefined;
        next();
    } catch (error) {
        next(error); // Pass error to next middleware
    }
});

//instance method

userSchema.methods.correctPassword = async function (enteredPassword, hashedPassword) {
    return await bcrypt.compare(enteredPassword, hashedPassword);
}

const User = mongoose.model('User', userSchema);
module.exports = User;
