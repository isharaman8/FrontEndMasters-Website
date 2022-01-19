const { Schema, model } = require("mongoose");

const courseSchema = new Schema({
	courseName: {
		type: String,
		required: true,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: "teacher",
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
});

module.exports = model("course", courseSchema);
