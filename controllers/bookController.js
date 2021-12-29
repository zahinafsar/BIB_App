const { book } = require("../models/Book");

exports.add_book = async (req, res, next) => {
    try {
        const {
            title,
            writer,
            coverPhoto,
            description,
            chapters,
        } = req.body;
        const bookData = {
            title,
            writer,
            coverPhoto,
            description,
            chapters,
        }
        mongoBookData = new book(bookData);
        const uploadedBook = await mongoBookData.save();
        return res.status(200).json({
            message: "Book added successfully",
            data: uploadedBook,
        })
    } catch (error) {
        next(error);
    }
}

exports.get_books = async (req, res, next) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const allBooks = await book.find({})
        .limit(limit)
        .skip(limit * page);
        return res.status(200).json({
            message: "Books are fetched successfully",
            data: allBooks,
        })
    } catch (error) {
        next(error);
    }
}