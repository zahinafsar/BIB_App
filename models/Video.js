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
		cover: {
			type: String,
			required: true,
		},
		duration: {
			type: String,
			required: true,
		},
		file: {
			type: String,
			required: true,
		},
        bookId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Book",
		}
	}
);

const Video = mongoose.model("Video", VideoSchema);
module.exports = Video
