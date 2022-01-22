const Author = require("../models/authors.test.model");
const redis = require("../config/redis");
const fs = require("fs");
const path = require("path");

const {
	INTERNAL_SERVER_ERROR,
	OK,
	BAD_REQUEST,
} = require("../utils/error_codes");

const getAuthorsStatic = async (req, res) => {
	try {
		const authors = await Author.find().lean().exec();
		return res.status(OK).send(authors);
	} catch (err) {
		console.log("Error", err);
		return res.status(INTERNAL_SERVER_ERROR).send({ err: err.messgage });
	}
};

const createAuthor = async (req, res) => {
	try {
		let madeAuthor = req.body;
		madeAuthor.authorImg = req.file.filename;
		madeAuthor = await Author.create(madeAuthor);
		return res.status(OK).send(madeAuthor);
	} catch (err) {
		console.log(err);
		return res.status(INTERNAL_SERVER_ERROR).send({ err: err.message });
	}
};

const deleteAuthor = async (req, res) => {
	try {
		const author = await Author.findByIdAndDelete(req.params.id);
		if (!author) {
			return res.status(BAD_REQUEST).send({ message: `No authors found` });
		}

		const filePath = path.join(
			__dirname,
			`../uploads/authorImages/${author.authorImg}`
		);
		fs.unlink(filePath, function (err) {
			if (err) console.log(err);
			console.log(`removed file: ${author.authorImg}`);
		});
		return res.status(OK).send(author);
	} catch (err) {
		console.log(err);
		return res.status(INTERNAL_SERVER_ERROR).send({ error: err.message });
	}
};

module.exports = { getAuthorsStatic, createAuthor, deleteAuthor };
