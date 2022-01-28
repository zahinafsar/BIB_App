const mongoose = require("mongoose");

var PodcastSchema = new mongoose.Schema(
	{
        title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		text: String,
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

const Podcast = mongoose.model("Podcast", PodcastSchema);
module.exports = Podcast
