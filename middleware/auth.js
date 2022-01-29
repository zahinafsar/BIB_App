const { verify_token } = require("../utils/func");
const User = require("../models/Users");

exports.check_auth = (role) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(403).json({
          error: "No authorization token found!",
        });
      }
      const user = verify_token(req.headers.authorization.split(" ")[1]);
      const userData = await User.findById(user.id);
      let isAuthenticated = false;
      userData.roles.forEach((userRole) => {
        if (role.includes(userRole)) {
          isAuthenticated = true;
        }
      });
      if (isAuthenticated) {
        req.user = userData;
        next();
      } else {
        return res.status(403).json({
          error: "You are not authorized to perform this action",
        });
      }
    } catch (error) {
      next(error);
    }
  };
};
