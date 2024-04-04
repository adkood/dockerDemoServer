const User = require('../models/UserModel');
const { promisify } = require('util');
const CatchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');

exports.getAllUsers = CatchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        status: "success",
        data: {
            users,
        }
    })
});

exports.getUserById = CatchAsync(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    
    if (!user) {
        next(new AppError(400, "No user found with this id!"));
    }

    res.status(200).json({
        status: "success",
        data: {
            user,
        }
    });
});