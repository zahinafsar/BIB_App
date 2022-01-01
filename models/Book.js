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

var BookSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
        writer: {
			type: String,
			required: true,
		},
        coverPhoto: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		}
	},
	{
		timestamps: true,
	}
);


var AudioSchema = new mongoose.Schema(
	{
        title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
        chapterId: {
			type: String,
			required: true,
		}
	}
);

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
        chapterId: {
			type: String,
			required: true,
		}
	}
);

const Book = mongoose.model("Book", BookSchema);
const Chapter = mongoose.model("Chapter", ChapterSchema);
const Audio = mongoose.model("Audio", AudioSchema);
const Video = mongoose.model("Video", VideoSchema);
module.exports = {Book, Audio, Video, Chapter};
