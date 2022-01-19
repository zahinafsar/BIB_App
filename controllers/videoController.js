const Book = require("../models/Book");
const Video = require("../models/Video");

//////////////////// video
exports.add_book_video = async (req, res, next) => {
    try {
        const {
            bookId,
            title,
            description,
            file
        } = req.body;

        const video = {
            bookId,
            title,
            description,
            file
        }
        const isExist = await Book.findById(bookId)
        if (!isExist) {
            return res.status(404).json({
                message: "Book not found",
            })
        }
        mongoVideoData = new Video(video)
        const uploadedVideo = await mongoVideoData.save();
        return res.status(200).json({
            message: "Video uploaded successfully",
            data: uploadedVideo
        })
    } catch (error) {
        next(error);
    }
}

exports.update_book_video = async (req, res, next) => {
    try {
        const {
            _id,
            title,
            description,
            file
        } = req.body;

        const video = {
            title,
            description,
            file
        }
        const isExist = await Video.findById(_id)
        if (!isExist) {
            return res.status(404).json({
                message: "Video not found",
            })
        }
        await Video.updateOne({_id: _id}, video)
        return res.status(200).json({
            message: "Video updated successfully"
        })
    } catch (error) {
        next(error);
    }
}

exports.get_all_videos = async (req, res, next) => {
    console.log("get_all_videos")
    try {
        const videos = await Video.find({})
        return res.status(200).json({
            message: "Videos fetched successfully",
            data: videos
        })
    } catch (error) {
        next(error);
    }
}
//////////////////// video