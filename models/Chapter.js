const mongoose = require("mongoose");

var ChapterSchema = new mongoose.Schema(
	{
		bookId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Book",
			required: true,
		},
		chapterNo: {
			type: Number,
			required: true,
		},
        title: {
			type: String,
			required: true,
		},
        text: {
			type: String,
			required: true,
		},
		language: {
			type: String,
			required: true,
		},
		audio: {
			type: String,
			required: true,
		}
	}
);

const Chapter = mongoose.model("Chapter", ChapterSchema);
module.exports = Chapter
