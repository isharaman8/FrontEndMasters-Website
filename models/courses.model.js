const { Schema, model } = require("mongoose");

let date = new Date();

const courseSchema = new Schema({
	courseName: {
		type: String,
		required: true,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: "author",
		required: false,
	},
	description: {
		type: String,
		required: true,
	},
	webpImg: {
		type: String,
		required: true,
	},
	previewImage: {
		type: String,
		required: true,
	},
	duration: {
		type: String,
		required: false,
	},
	publishedAt: {
		type: Date,
		required: false,
		default: date.toDateString(),
	},
	popular: {
		type: Boolean,
		default: false,
	},
});

module.exports = model("course", courseSchema);
