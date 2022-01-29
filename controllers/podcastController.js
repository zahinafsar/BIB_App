const Book = require("../models/Book");
const Podcast = require("../models/Podcast");

//////////////////// podcast
exports.add_book_podcast = async (req, res, next) => {
  try {
    const { bookId, title, text, description, file } = req.body;

    if (!bookId) {
      return res.status(400).json({
        error: "BookId is required",
      });
    }
    const isExist = await Book.findById(bookId);
    if (!isExist) {
      return res.status(404).json({
        error: "Book not found",
      });
    }

    const podcast = {
      bookId,
      title,
      text,
      cover: isExist.coverPhoto,
      description,
      file,
    };

    mongopodcastData = new Podcast(podcast);
    const uploadedpodcast = await mongopodcastData.save();
    return res.status(200).json({
      message: "Podcast uploaded successfully",
      data: uploadedpodcast,
    });
  } catch (error) {
    next(error);
  }
};

exports.update_book_podcast = async (req, res, next) => {
  try {
    const { _id, title, text, description, file } = req.body;

    const podcast = {
      title,
      text,
      description,
      file,
    };
    const isExist = await Podcast.findById(_id);
    if (!isExist) {
      return res.status(404).json({
        error: "podcast not found",
      });
    }
    await Podcast.updateOne({ _id: _id }, podcast);
    return res.status(200).json({
      message: "Podcast updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.get_all_podcasts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;

    const allPodcast = await Podcast.find({})
      .limit(limit)
      .skip(limit * page);
    const podcasts = allPodcast.reduce((acc, curr) => {
      const podcast = curr._doc;
      acc.push({
        ...podcast,
        isFavourite: req.user.favourite.podcast.includes(podcast._id),
      });
      return acc;
    }, []);
    return res.status(200).json({
      message: "Podcasts fetched successfully",
      data: podcasts,
    });
  } catch (error) {
    next(error);
  }
};
//////////////////// podcast
