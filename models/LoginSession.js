const { Schema, model } = require("mongoose");

const loginSessionSchema = new Schema(
	{
		userObjId: Schema.Types.ObjectId,
		twoStepVerified: Boolean,
		twoStepVerifyCode: {
			code: Number,
			wrongTry: { type: Number, default: 0 },
			expire: Number,
		},
		sessionName: String,
		sessionToken: String,
		createTime: Number,
		expireTime: Number,
	},
	{
		timestamps: true,
	}
);

const LoginSession = model("LoginSession", loginSessionSchema);

module.exports = LoginSession;
