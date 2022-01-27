const mongoose = require("mongoose");
const crypto = require("crypto");

var UserSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, "First name is required"],
		},
		lastName: {
			type: String,
			required: [true, "Last name is required"],
		},
		// username: {
		// 	type: String,
		// 	lowercase: true,
		// 	unique: [true, "Username should be unique"],
		// 	required: [true, "Username can't be blank"],
		// 	match: [/^[a-zA-Z0-9]+$/, "Username is invalid"],
		// 	index: true,
		// },
		email: {
			type: String,
			lowercase: true,
			unique: true,
			required: [true, "Email can't be blank"],
			match: [/\S+@\S+\.\S+/, "Email is invalid"],
			index: true,
		},
		roles: [{ type: "String" }],
		isEmailVerified: { type: Boolean, default: true },
		// isPhoneVerified: { type: Boolean, default: false },
		password: {
			type: String,
			required: true,
		},
		bookMarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book", unique: true }],
		favouritePodcasts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Podcast", unique: true }],
		favouriteVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video", unique: true }],
		// phone: Number,
		resetPasswordToken: String,
		resetPasswordExpires: Date,
		avatar: String,
		lastOnline: Date,
		emailVerifyCode: {
			code: Number,
			codeExpireTime: Date,
			wrongTry: Number,
			used: Boolean,
		},
		// phoneVerifyCode: {
		// 	code: Number,
		// 	codeExpireTime: Date,
		// 	wrongTry: Number,
		// 	used: Boolean,
		// },
		forgetCode: {
			code: Number,
			codeExpireTime: Date,
			wrongTry: Number,
			used: Boolean,
			worked: Boolean,
			token: String,
		},
	},
	{
		timestamps: true,
	}
);

const user = mongoose.model("User", UserSchema);
module.exports = user;
