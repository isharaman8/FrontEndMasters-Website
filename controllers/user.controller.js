const User = require("../models/user.test.model");
const jwt = require("jsonwebtoken");
const redis = require("../config/redis");
require("dotenv").config();

const { StatusCodes } = require("http-status-codes");

const { INTERNAL_SERVER_ERROR, OK, BAD_REQUEST } = StatusCodes;

const generateToken = (user) => {
	return jwt.sign({ user }, process.env.SECRET_HASH);
};

const registerUser = async (req, res) => {
	try {
		let user = await User.findOne(req.body.email).lean().exec();
		if (user) {
			return res
				.status(BAD_REQUEST)
				.send({ message: "User with this email already exists" });
		}

		user = await User.create(req.body);
		let token = generateToken(user);
		return res.status(OK).send({ user, token });
	} catch (err) {
		console.log("Error", err);
		return res.status(INTERNAL_SERVER_ERROR).send({ err: err.message });
	}
};

module.exports = { registerUser };
