const mongoose = require("mongoose");

var VideoSchema = new mongoose.Schema(
	{
        title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		file: {
			type: String,
			required: true,
		},
        bookId: {
			type: String,
			required: true,
		}
	}
);

const Video = mongoose.model("Video", VideoSchema);
module.exports = Video
