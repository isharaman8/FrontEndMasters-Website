const Author = require("../models/authors.test.model");
const redis = require("../config/redis");

const { StatusCodes } = require("http-status-codes");

const { INTERNAL_SERVER_ERROR, OK } = StatusCodes;

const getAuthorsStatic = async (req, res) => {
	try {
		const authors = await Author.find().lean().exec();
		return res.status(OK).send(authors);
	} catch (err) {
		console.log("Error", err);
		return res.status(INTERNAL_SERVER_ERROR).send({ err: err.messgage });
	}
};

module.exports = { getAuthorsStatic };
