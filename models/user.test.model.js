const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
	{
		first_name: {
			type: String,
			required: true,
		},
		last_name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		course_purchased: {
			type: String,
			required: true,
		},
	},
	{
		versionKey: false,
	}
);

userSchema.pre("save", function (next) {
	if (!this.isModified("password")) return next();
	this.password = bcrypt.hashSync(this.password, 8);
	return next();
});

userSchema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = model("user", userSchema);
