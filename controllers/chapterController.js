const Book = require("../models/Book");
const Chapter = require("../models/Chapter");

//////////////////// Chapter
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
//////////////////// Chapter