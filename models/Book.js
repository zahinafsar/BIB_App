const mongoose = require("mongoose");

var ChapterSchema = new mongoose.Schema(
	{
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
		},
		chapters: [ChapterSchema],
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

const book = mongoose.model("Book", BookSchema);
const audio = mongoose.model("Audio", AudioSchema);
const video = mongoose.model("Video", VideoSchema);
module.exports = {book, audio, video};
