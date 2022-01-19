const Book = require("../models/Book");
const Chapter = require("../models/Chapter");


//////////////////// Book
exports.add_book = async (req, res, next) => {
    try {
        const {
            title,
            writer,
            coverPhoto,
            description,
        } = req.body;
        const bookData = {
            title,
            writer,
            coverPhoto,
            description,
        }
        mongoBookData = new Book(bookData);
        const uploadedBook = await mongoBookData.save();
        return res.status(200).json({
            message: "Book has been created successfully",
            data: uploadedBook,
        })
    } catch (error) {
        next(error);
    }
}

exports.update_book = async (req, res, next) => {
    try {
        const {
            _id,
            title,
            writer,
            coverPhoto,
            description,
        } = req.body;

        const bookData = {
            title,
            writer,
            coverPhoto,
            description,
        }

        const isExist = await Book.find({ _id: _id })
        if (!isExist?.length) {
            return res.status(403).json({
                message: "Book does not exist",
            })
        }
        await Book.updateOne({ "_id": _id}, bookData)
        return res.status(200).json({
            message: `Book has been updated successfully`
        })
    } catch (error) {
        next(error);
    }
}

exports.get_all_book = async (req, res, next) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const allBooks = await Book.find({})
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

exports.get_book = async (req, res, next) => {
    const id = req.params.id
    try {
        const book = await Book.find({ _id: id })
        if (!book.length) {
            return res.status(404).json({
                message: "Book not found",
            })
        }
        const chapters = await Chapter.find({ bookId: id })
        return res.status(200).json({
            message: "Successful",
            data: {...book[0]._doc, chapters},
        })
    } catch (error) {
        next(error);
    }
}
//////////////////// Book