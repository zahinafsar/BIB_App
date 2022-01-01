const { Book, Chapter } = require("../models/Book");

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

exports.add_chapter = async (req, res, next) => {
    try {
        const {
            bookId,
            chapterNo,
            title,
            text,
            language,
            audio,
        } = req.body;

        const chapter = {
            bookId,
            chapterNo,
            title,
            text,
            language,
            audio,
        }
        const book = await Book.find({ _id: bookId })
        if (!book.length) {
            return res.status(404).json({
                message: "Book not found",
            })
        }
        const isExist = await Chapter.find({ bookId: bookId, chapterNo: chapterNo })
        if (isExist?.length) {
            return res.status(403).json({
                message: "Chapter No. already exist",
            })
        }
        mongoChapterData = new Chapter(chapter)
        const uploadedChapter = await mongoChapterData.save();
        return res.status(200).json({
            message: "Chapter uploaded successfully",
            data: uploadedChapter
        })
    } catch (error) {
        next(error);
    }
}

exports.update_chapter = async (req, res, next) => {
    try {
        const {
            bookId,
            chapterNo,
            title,
            text,
            language,
            audio,
        } = req.body;

        const chapter = {
            bookId,
            chapterNo,
            title,
            text,
            language,
            audio
        }

        const isExist = await Chapter.find({ bookId: bookId, chapterNo: chapterNo })
        if (!isExist?.length) {
            return res.status(403).json({
                message: "Chapter does not exist",
            })
        }
        await Chapter.updateOne({ "bookId": bookId, "chapterNo": chapterNo}, chapter)
        return res.status(200).json({
            message: `Chapter No. ${chapterNo} has been updated successfully`
        })
    } catch (error) {
        next(error);
    }
}

exports.get_books = async (req, res, next) => {
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

exports.get_chapters = async (req, res, next) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const bookId = req.params.id
    try {
        const allChapters = await Chapter.find({bookId})
        .limit(limit)
        .skip(limit * page);
        return res.status(200).json({
            message: "Chapters are fetched successfully",
            data: allChapters,
        })
    } catch (error) {
        next(error);
    }
}

exports.get_chapter = async (req, res, next) => {
    const bookId = req.params.bookId
    const chapterId = req.params.chapterId
    try {
        const chapter = await Chapter.find({ _id: chapterId, bookId: bookId })
        return res.status(200).json({
            message: "Successful",
            data: chapter,
        })
    } catch (error) {
        next(error);
    }
}
