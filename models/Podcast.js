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

const Podcast = mongoose.model("Podcast", PodcastSchema);
module.exports = Podcast
