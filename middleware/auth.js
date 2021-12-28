const { verify_token } = require("../utils/func");
const User = require("../models/Users");

exports.check_auth = (user) => {
    return async (req, res, next) => {
        if (user === "admin") {
            // if (req.user.roles.includes("admin")) {
            //     next();
            // } else {
            //     return res.status(403).json({
            //         message: "You are not authorized to perform this action",
            //     });
            // }
            next();
        } else if (user === "user") {
            try {
                const token = req.headers.authorization;
                if (!token) {
                    return res.status(403).json({
                        message: "No authorization token found!",
                    });
                }
                const user = verify_token(req.headers.authorization.split(" ")[1]);
                const userData = await User.findOne({ _id: user.id });
                if (userData.roles.includes("user")) {
                    req.user = userData;
                    next();
                } else {
                    return res.status(403).json({
                        message: "You are not authorized to perform this action",
                    });
                }
            } catch (error) {
                next(error);
            }
        } else {
            next();
        }
        // const { token } = req.headers;
    }
}