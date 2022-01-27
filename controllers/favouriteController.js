const User = require("../models/Users");
const Book = require("../models/Book");
const Video = require("../models/Video");
const Podcast = require("../models/Podcast");

exports.get_my_profile = async (req, res, next) => {
  try {
    const user = req.user;
    return res.status(200).json({
      message: "User profile",
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.add_book_mark = async (req, res, next) => {
  try {
    const { bookId } = req.body;
    const user = req.user;
    //////////////////////////////////////////////// Validations
    const book = await Book.find({ _id: bookId || null });
    if (!bookId || bookId.length === 0 || book.length === 0) {
      return res.status(400).json({
        message: "Invalid Book id",
      });
    }
    if (user.bookMarks.includes(bookId)) {
      return res.status(403).json({
        message: "Book is already marked",
      });
    }
    //////////////////////////////////////////////// Validations
    await User.updateOne(
      { _id: user._id },
      { $set: { bookMarks: [...user.bookMarks, bookId] } },
      { upsert: true }
    );
    return res.status(200).json({
      message: "Book is marked successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.get_book_mark = async (req, res, next) => {
  try {
    const user = req.user;
    // get user fevourite podcasts
    const books = await Book.find({
      _id: { $in: user.bookMarks },
    });
    return res.status(200).json({
      message: "BookMarks are fetched successfully",
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

exports.add_favourite_podcast = async (req, res, next) => {
  try {
    const { podcastId } = req.body;
    const user = req.user;
    //////////////////////////////////////////////// Validations
    const podcast = await Podcast.find({ _id: podcastId || null });
    if (!podcastId || podcastId.length === 0 || podcast.length === 0) {
      return res.status(400).json({
        message: "Invalid podcast id",
      });
    }
    if (user.favouritePodcasts.includes(podcastId)) {
      return res.status(403).json({
        message: "Podcast is already marked as fevourite",
      });
    }
    //////////////////////////////////////////////// Validations
    await User.updateOne(
      { _id: user._id },
      { $set: { favouritePodcasts: [...user.favouritePodcasts, podcastId] } },
      { upsert: true }
    );
    return res.status(200).json({
      message: "Podcasts is marked successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.get_favourite_podcast = async (req, res, next) => {
  try {
    const user = req.user;
    // get user fevourite podcasts
    const podcasts = await Podcast.find({
      _id: { $in: user.favouritePodcasts },
    });
    return res.status(200).json({
      message: "Podcasts are fetched successfully",
      data: podcasts,
    });
  } catch (error) {
    next(error);
  }
};

exports.add_favourite_video = async (req, res, next) => {
  try {
    const { videoId } = req.body;
    const user = req.user;
    //////////////////////////////////////////////// Validations
    const video = await Video.find({ _id: videoId || null });
    if (!videoId || videoId.length === 0 || video.length === 0) {
      return res.status(400).json({
        message: "Invalid video id",
      });
    }
    if (user.favouriteVideos.includes(videoId)) {
      return res.status(403).json({
        message: "Video is already marked as fevourite",
      });
    }
    //////////////////////////////////////////////// Validations
    await User.updateOne(
      { _id: user._id },
      { $set: { favouriteVideos: [...user.favouriteVideos, videoId] } },
      { upsert: true }
    );
    return res.status(200).json({
      message: "Video is marked successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.get_favourite_video = async (req, res, next) => {
  try {
    const user = req.user;
    // get user fevourite podcasts
    const videos = await Video.find({
      _id: { $in: user.favouriteVideos },
    });
    return res.status(200).json({
      message: "Podcasts are fetched successfully",
      data: videos,
    });
  } catch (error) {
    next(error);
  }
};
