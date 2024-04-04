const express = require('express');
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');
const User = require('../models/UserModel');

const Router = express.Router();

Router.get('/users', AuthController.protect, UserController.getAllUsers);
Router.get('/users/:id', AuthController.protect, UserController.getUserById);
Router.patch('/updatePassword', AuthController.protect, AuthController.updatePassword);

module.exports = Router;