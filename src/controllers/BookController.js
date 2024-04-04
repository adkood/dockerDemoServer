const Book = require("../models/BookModel");

exports.createBook = async (req, res) => {
    try {
        const { title, description, author, genre } = req.body;
        const userId = req.user._id; 
        const book = new Book({
            title,
            author,
            description,
            genre,
            postedBy: userId
        });

        await book.save();

        req.io.emit('addBook', book);

        res.status(201).json({
            status: "success",
            data: {
                book
            }
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

exports.getAllBooks = async (req, res) => {
    try {
        let query = {};

        // Filter by title
        if (req.query.title) {
            query.title = { $regex: new RegExp(req.query.title, 'i') };
        }

        // Filter by author
        if (req.query.author) {
            query.author = { $regex: new RegExp(req.query.author, 'i') };
        }

        // Filter by genre
        if (req.query.genre) {
            query.genre = { $regex: new RegExp(req.query.genre, 'i') };
        }

        const books = await Book.find(query);

        res.status(200).json({
            status: "success",
            data: {
                books
            }
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};


exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({
            status: "success",
            data: {
                book
            }
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({
            status: "success",
            data: {
                book
            }
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(202).json({ status: "success", message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};
