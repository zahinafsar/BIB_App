const User = require("../models/Users");
const Book = require("../models/Book");
const Video = require("../models/Video");
const Podcast = require("../models/Podcast");
const _ = require("lodash");

const favouritesType = {
  book: Book,
  video: Video,
  podcast: Podcast,
};

exports.add_favourite = async (req, res, next) => {
  try {
    const user = req.user;
    const { id, type } = req.body;
    const isTypeOk = Object.keys(favouritesType).includes(type)
    if (!isTypeOk) {
      return res.status(400).json({
        error: "Invalied type",
      });
    }
    //////////////////////////////////////////////// Validations
    const data = await favouritesType[type].find({ _id: id || null });
    if (!id || id.length === 0 || data.length === 0) {
      return res.status(400).json({
        error: `Invalid ${type} id`,
      });
    }
    if (user.favourite[type].includes(id)) {
      await User.updateOne(
        { _id: user._id },
        { $pull: { [`favourite.${type}`]: id } },
        { upsert: true }
      );
      return res.status(200).json({
        message: `${_.startCase(type)} has been removed successfully`,
      });
    }else{
      await User.updateOne(
        { _id: user._id },
        { $push: { [`favourite.${type}`]: id } },
        { upsert: true }
      );
      return res.status(200).json({
        message: `${_.startCase(type)} has been marked successfully`,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.get_favourite = async (req, res, next) => {
  try {
    const user = req.user;
    const { type } = req.params;
    const isTypeOk = Object.keys(favouritesType).includes(type)
    console.log(isTypeOk);
    if (!isTypeOk) {
      return res.status(400).json({
        error: "Invalied type",
      });
    }
    // get user fevourite podcasts
    const data = await favouritesType[type].find({
      _id: { $in: user.favourite[type] },
    });
    return res.status(200).json({
      error: `Favourite ${type}s are fetched successfully`,
      data,
    });
  } catch (error) {
    next(error);
  }
};

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

exports.edit_my_profile = async (req, res, next) => {
  try {
    const { firstName, lastName, email, location, avatar } = req.body;
    const user = req.user;
    const data = {
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      email: email || user.email,
      location: location || user.location,
      avatar: avatar || user.avatar,
    };
    await User.updateOne({ _id: user._id }, { $set: data });
    return res.status(200).json({
      message: "User Updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
