const User = require("../models/Users");

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
      message: "User Updated successfully"
    });
  } catch (error) {
    next(error);
  }
};