const Book = require("../models/Book");
const Video = require("../models/Video");

//////////////////// video
exports.add_book_video = async (req, res, next) => {
  try {
    const { bookId, cover, duration, title, description, file } = req.body;

    const video = {
      bookId,
      cover,
      duration,
      title,
      description,
      file,
    };
    const isExist = await Book.findById(bookId);
    if (!isExist) {
      return res.status(404).json({
        error: "Book not found",
      });
    }
    mongoVideoData = new Video(video);
    const uploadedVideo = await mongoVideoData.save();
    return res.status(200).json({
      message: "Video uploaded successfully",
      data: uploadedVideo,
    });
  } catch (error) {
    next(error);
  }
};

exports.update_book_video = async (req, res, next) => {
  try {
    const { _id, title, cover, duration, description, file } = req.body;

    const video = {
      title,
      cover,
      duration,
      description,
      file,
    };
    const isExist = await Video.findById(_id);
    if (!isExist) {
      return res.status(404).json({
        error: "Video not found",
      });
    }
    await Video.updateOne({ _id: _id }, video);
    return res.status(200).json({
      message: "Video updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.get_all_videos = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const allVideo = await Video.find({})
      .limit(limit)
      .skip(limit * page);
    const videos = allVideo.reduce((acc, curr) => {
      const video = curr._doc;
      acc.push({
        ...video,
        isFavourite: req.user.favourite.video.includes(video._id),
      });
      return acc;
    }, []);
    return res.status(200).json({
      message: "Videos fetched successfully",
      data: videos,
    });
  } catch (error) {
    next(error);
  }
};
//////////////////// video
