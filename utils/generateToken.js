var jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
	const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
		expiresIn: 60 * 60,
	});
	return token;
};
