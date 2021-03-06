const mongoose = require("mongoose");

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

const Book = mongoose.model("Book", BookSchema);
module.exports = Book
