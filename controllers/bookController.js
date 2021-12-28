const { book } = require("../models/book");

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