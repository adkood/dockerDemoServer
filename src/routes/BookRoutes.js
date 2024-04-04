const express = require('express');
const bookController = require('../controllers/BookController');
const AuthController = require('../controllers/AuthController');

const Router = express.Router();

Router.post('/books', AuthController.protect, bookController.createBook);
Router.get('/books', AuthController.protect, bookController.getAllBooks);
Router.get('/books/:id', AuthController.protect, bookController.getBookById);
Router.put('/books/:id', AuthController.protect, bookController.updateBook);
Router.delete('/books/:id', AuthController.protect, bookController.deleteBook);

module.exports = Router;
