const Book = require("../models/Book");
const Podcast = require("../models/Podcast");

//////////////////// podcast
exports.add_book_podcast = async (req, res, next) => {
    try {
        const {
            bookId,
            title,
            description,
            file
        } = req.body;

        const podcast = {
            bookId,
            title,
            description,
            file
        }
        if (!bookId) {
            return res.status(400).json({
                message: "BookId is required",
            })
        }
        const isExist = await Book.findById(bookId)
        if (!isExist) {
            return res.status(404).json({
                message: "Book not found",
            })
        }
        mongopodcastData = new Podcast(podcast)
        const uploadedpodcast = await mongopodcastData.save();
        return res.status(200).json({
            message: "Podcast uploaded successfully",
            data: uploadedpodcast
        })
    } catch (error) {
        next(error);
    }
}

exports.update_book_podcast = async (req, res, next) => {
    try {
        const {
            _id,
            title,
            description,
            file
        } = req.body;

        const podcast = {
            title,
            description,
            file
        }
        const isExist = await Podcast.findById(_id)
        if (!isExist) {
            return res.status(404).json({
                message: "podcast not found",
            })
        }
        await Podcast.updateOne({_id: _id}, podcast)
        return res.status(200).json({
            message: "Podcast updated successfully"
        })
    } catch (error) {
        next(error);
    }
}

exports.get_all_podcasts = async (req, res, next) => {
    console.log("get_all_podcasts")
    try {
        const podcasts = await Podcast.find({})
        return res.status(200).json({
            message: "Podcasts fetched successfully",
            data: podcasts
        })
    } catch (error) {
        next(error);
    }
}
//////////////////// podcast